import { inject, Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from '../../../environments/environment'
import { PaginatedPlanificacionsResponse, Planificacio } from '../models/planificacio.model'

@Injectable({
  providedIn: 'root'
})
export class PlanificacionsService {
  private http = inject(HttpClient)
  private apiUrl = `${environment.apiUrl}/planificacions`

  getPlanificacions(page: number, limit: number, search: string = ''): Observable<PaginatedPlanificacionsResponse> {
    let params = new HttpParams()
      .set('page', page)
      .set('limit', limit)

    if (search.trim()) {
      params = params.set('search', search.trim())
    }

    return this.http.get<PaginatedPlanificacionsResponse>(this.apiUrl, { params })
  }

  getAllPlanificacions(): Observable<Planificacio[]> {
    return this.http.get<Planificacio[]>(`${this.apiUrl}/all`)
  }

  createPlanificacio(planificacio: Planificacio): Observable<Planificacio> {
    return this.http.post<Planificacio>(this.apiUrl, planificacio)
  }

  updatePlanificacio(id: string, planificacio: Planificacio): Observable<Planificacio> {
    return this.http.put<Planificacio>(`${this.apiUrl}/${id}`, planificacio)
  }

  deletePlanificacio(id: string): Observable<Planificacio> {
    return this.http.delete<Planificacio>(`${this.apiUrl}/${id}`)
  }

  restorePlanificacio(id: string): Observable<Planificacio> {
    return this.http.put<Planificacio>(`${this.apiUrl}/restore/${id}`, {})
  }
}