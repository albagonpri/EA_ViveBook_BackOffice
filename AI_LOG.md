## Eina i model IA usats
- Eina: ChatGPT
- Model: GPT-5.4 Thinking

---

## Consulta 1

**Pregunta**  
Com afegir una nova secció de Planificacions al frontend Angular seguint l’estructura del projecte?

**Prompt**  
Necessito crear la part frontend per a una nova entitat Planificacio, seguint l’estructura del projecte amb models, services i components.

**Incoherències**  
La primera proposta assumia una estructura de carpetes més profunda que la que finalment s’ha utilitzat al projecte.

**Solució**  
Es van adaptar manualment les rutes i imports perquè encaixessin amb la ubicació real dels fitxers dins de `features/planificacions/pages`.

---

## Consulta 2

**Pregunta**  
Com afegir una barra de progrés al component de Planificacions segons les fites completades?

**Prompt**  
Necessito un component nou que mostri el llistat de fites i una barra de progrés calculada en temps real segons les fites completades.

**Incoherències**  
La primera versió era funcional però no encaixava del tot amb el comportament real del projecte, especialment en la gestió dels filtres i la recàrrega del llistat.

**Solució**  
Vaig ajustar manualment els mètodes del component perquè el llistat es recarregués correctament després de crear o editar elements, i també vaig corregir el càlcul de la barra de progrés perquè es mostrés en temps real segons el nombre de fites completades respecte del total.

---

## Consulta 3

**Pregunta**  
Com detectar per què les planificacions creades no apareixien al llistat inferior?

**Prompt**  
He creat la pàgina de Planificacions però les dades no apareixen al llistat. Què haig de revisar?

**Incoherències**  
Inicialment no es veia clar si el problema era del backend o del frontend.

**Solució**  
Es va comprovar que el backend responia correctament i es va detectar que el filtre de cerca del llistat estava actiu. També es van afegir comprovacions i gestió d’errors al mètode `save()` per facilitar la validació manual.

---

## Consulta 4

**Pregunta**  
Com adaptar l’arxiu HTML del component de Planificacions per mostrar millor la informació?

**Prompt**  
Necessito reorganitzar la plantilla HTML del component perquè el llistat, el formulari i les fites es mostrin d’una manera més clara.

**Incoherències**  
La proposta inicial era funcional, però la distribució dels elements no s’ajustava del tot a l’estructura visual que necessitava el projecte.

**Solució**  
Vaig modificar manualment l’arxiu HTML per ordenar millor els blocs del formulari, el llistat i la visualització de les fites, fent la interfície més clara i coherent.

---

## Consulta 5

**Pregunta**  
Com recarregar el llistat de planificacions després de crear o editar una entrada?

**Prompt**  
Vull que el llistat es refresqui automàticament després de guardar una nova planificació o modificar-ne una d’existent.

**Incoherències**  
La primera proposta desava correctament, però la vista no s’actualitzava fins recarregar la pàgina manualment.

**Solució**  
Vaig revisar la lògica del component i vaig afegir la recàrrega de dades després de les operacions de creació i edició perquè el llistat es mantingués sincronitzat.

---

## Consulta 6

**Pregunta**  
Com gestionar millor els errors en desar una planificació?

**Prompt**  
Vull controlar millor els errors quan es crea o edita una planificació per poder detectar incidències més ràpidament.

**Incoherències**  
La primera proposta contemplava el flux principal, però no ajudava gaire a identificar errors durant les proves.

**Solució**  
Vaig afegir comprovacions i gestió d’errors al procés de desat per facilitar la validació manual i detectar problemes de manera més clara.

## Consulta 7
**Pregunta**  
Com fer el fitxer resumint l'ús de IA?

**Prompt**  
Resumeix tot el que he consultat en aquest xat en un format de fitxer .md especificant la meva pregunta, prompt i el que he indicat que estava malament. 

**Incoherències**  

**Solució**  
He afegit l'apartat de solució a cada consulta per especifícar el que he hagut de canviar.
