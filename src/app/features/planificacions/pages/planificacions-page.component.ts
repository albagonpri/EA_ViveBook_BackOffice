import { CommonModule } from '@angular/common'
import { Component, OnInit, computed, inject, signal } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { PlanificacionsService } from '../../../Core/services/planificacions.service'
import { LibrosService } from '../../../Core/services/libros.service'
import { Planificacio, Milestone } from '../../../Core/models/planificacio.model'
import { Libro } from '../../../Core/models/libro.model'

@Component({
  selector: 'app-planificacions-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './planificacions-page.component.html',
  styleUrls: ['./planificacions-page.component.css']
})
export class PlanificacionsPageComponent implements OnInit {
  private planificacionsService = inject(PlanificacionsService)
  private librosService = inject(LibrosService)

  planificacions = signal<Planificacio[]>([])
  llibres = signal<Libro[]>([])
  loading = signal(false)

  page = signal(1)
  limit = signal(5)
  total = signal(0)
  totalPages = signal(0)
  search = signal('')

  isEditing = signal(false)
  selectedId = signal<string | null>(null)

  form = signal<Planificacio>({
    title: '',
    book: '',
    milestones: [
      { description: 'Revisar estat fisic del llibre', status: 'pending' },
      { description: 'Fer foto de la portada', status: 'pending' },
      { description: 'Fer foto de la contraportada', status: 'pending' }
    ]
  })

  formProgress = computed(() => this.getProgress(this.form().milestones))

  ngOnInit(): void {
    this.loadPlanificacions()
    this.loadLlibres()
  }

  loadPlanificacions(): void {
    this.loading.set(true)

    this.planificacionsService.getPlanificacions(this.page(), this.limit(), this.search()).subscribe({
      next: (response) => {
        this.planificacions.set(response.data)
        this.total.set(response.total)
        this.page.set(response.page)
        this.limit.set(response.limit)
        this.totalPages.set(response.totalPages)
        this.loading.set(false)
      },
      error: () => {
        this.loading.set(false)
      }
    })
  }

  loadLlibres(): void {
    this.librosService.getLibros().subscribe({
      next: (llibres) => this.llibres.set(llibres)
    })
  }

  onSearchChange(value: string): void {
    this.search.set(value)
    this.page.set(1)
    this.loadPlanificacions()
  }

  changePage(newPage: number): void {
    if (newPage < 1 || newPage > this.totalPages()) return
    this.page.set(newPage)
    this.loadPlanificacions()
  }

  addMilestone(): void {
    const current = this.form()
    this.form.set({
      ...current,
      milestones: [...current.milestones, { description: '', status: 'pending' }]
    })
  }

  removeMilestone(index: number): void {
    const current = this.form()
    this.form.set({
      ...current,
      milestones: current.milestones.filter((_, i) => i !== index)
    })
  }

  updateMilestoneDescription(index: number, value: string): void {
    const current = this.form()
    const milestones = current.milestones.map((milestone, i) =>
      i === index ? { ...milestone, description: value } : milestone
    )

    this.form.set({
      ...current,
      milestones
    })
  }

  updateMilestoneStatus(index: number, value: 'pending' | 'completed'): void {
    const current = this.form()
    const milestones = current.milestones.map((milestone, i) =>
      i === index ? { ...milestone, status: value } : milestone
    )

    this.form.set({
      ...current,
      milestones
    })
  }

  getProgress(milestones: Milestone[]): number {
    if (!milestones.length) return 0
    const completed = milestones.filter((milestone) => milestone.status === 'completed').length
    return Math.round((completed / milestones.length) * 100)
  }

  edit(planificacio: Planificacio): void {
    this.isEditing.set(true)
    this.selectedId.set(planificacio._id ?? null)
    this.form.set({
      ...planificacio,
      milestones: planificacio.milestones?.length
        ? [...planificacio.milestones]
        : [
            { description: 'Revisar estat fisic del llibre', status: 'pending' },
            { description: 'Fer foto de la portada', status: 'pending' },
            { description: 'Fer foto de la contraportada', status: 'pending' }
          ]
    })
  }

  save(): void {
    const data = this.form()

    if (!data.title.trim() || !data.book) {
      alert('Has d omplir el titol i seleccionar un llibre')
      return
    }

    if (this.isEditing() && this.selectedId()) {
      this.planificacionsService.updatePlanificacio(this.selectedId()!, data).subscribe({
        next: () => {
          this.resetForm()
          this.search.set('')
          this.page.set(1)
          this.loadPlanificacions()
        },
        error: (error) => {
          console.error(error)
          alert('Error actualitzant la planificacio')
        }
      })
      return
    }

    this.planificacionsService.createPlanificacio(data).subscribe({
      next: () => {
        this.resetForm()
        this.search.set('')
        this.page.set(1)
        this.loadPlanificacions()
      },
      error: (error) => {
        console.error(error)
        alert('Error creant la planificacio')
      }
    })
  }

  softDelete(id: string): void {
    this.planificacionsService.deletePlanificacio(id).subscribe({
      next: () => this.loadPlanificacions()
    })
  }

  resetForm(): void {
    this.isEditing.set(false)
    this.selectedId.set(null)
    this.search.set('')
    this.form.set({
      title: '',
      book: '',
      milestones: [
        { description: 'Revisar estat fisic del llibre', status: 'pending' },
        { description: 'Fer foto de la portada', status: 'pending' },
        { description: 'Fer foto de la contraportada', status: 'pending' }
      ]
    })
  }
}