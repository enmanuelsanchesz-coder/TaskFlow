
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardContent,
  IonIcon,
  IonProgressBar
} from '@ionic/angular';

import { addIcons } from 'ionicons';

import {
  checkmarkCircleOutline,
  timeOutline,
  listOutline,
  schoolOutline,
  briefcaseOutline,
  personOutline
} from 'ionicons/icons';

import { TaskService, Tarea } from '../task.service';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.page.html',
  styleUrls: ['./estadisticas.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardContent,
    IonIcon,
    IonProgressBar
  ]
})
export class EstadisticasPage {

  constructor(public taskService: TaskService) {
    addIcons({
      checkmarkCircleOutline,
      timeOutline,
      listOutline,
      schoolOutline,
      briefcaseOutline,
      personOutline
    });
  }

  get tareas(): Tarea[] {
    return this.taskService.tareas;
  }

  get totalTareas(): number {
    return this.tareas.length;
  }

  get completadas(): number {
    return this.tareas.filter(tarea => tarea.completada).length;
  }

  get pendientes(): number {
    return this.tareas.filter(tarea => !tarea.completada).length;
  }

  get porcentaje(): number {
    if (this.totalTareas === 0) return 0;

    return Math.round((this.completadas / this.totalTareas) * 100);
  }

  get progreso(): number {
    if (this.totalTareas === 0) return 0;

    return this.completadas / this.totalTareas;
  }

  get tareasUniversidad(): number {
    return this.tareas.filter(tarea => tarea.categoria === 'Universidad').length;
  }

  get tareasTrabajo(): number {
    return this.tareas.filter(tarea => tarea.categoria === 'Trabajo').length;
  }

  get tareasPersonal(): number {
    return this.tareas.filter(tarea => tarea.categoria === 'Personal').length;
  }

  get completadasUniversidad(): number {
    return this.tareas.filter(
      tarea => tarea.categoria === 'Universidad' && tarea.completada
    ).length;
  }

  get completadasTrabajo(): number {
    return this.tareas.filter(
      tarea => tarea.categoria === 'Trabajo' && tarea.completada
    ).length;
  }

  get completadasPersonal(): number {
    return this.tareas.filter(
      tarea => tarea.categoria === 'Personal' && tarea.completada
    ).length;
  }
}
