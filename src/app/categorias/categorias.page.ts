
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
  IonLabel,
  IonItem,
  IonList
} from '@ionic/angular';

import { addIcons } from 'ionicons';
import {
  schoolOutline,
  briefcaseOutline,
  personOutline,
  checkmarkCircleOutline,
  ellipseOutline
} from 'ionicons/icons';

import { TaskService, Tarea } from '../task.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
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
    IonLabel,
    IonItem,
    IonList
  ]
})
export class CategoriasPage {

  categoriaSeleccionada = 'Universidad';

  categorias = [
    { nombre: 'Universidad', icono: 'school-outline' },
    { nombre: 'Trabajo', icono: 'briefcase-outline' },
    { nombre: 'Personal', icono: 'person-outline' }
  ];

  constructor(public taskService: TaskService) {
    addIcons({
      schoolOutline,
      briefcaseOutline,
      personOutline,
      checkmarkCircleOutline,
      ellipseOutline
    });
  }

  seleccionarCategoria(nombre: string): void {
    this.categoriaSeleccionada = nombre;
  }

  get tareasFiltradas(): Tarea[] {
    return this.taskService.tareas.filter(
      tarea => tarea.categoria === this.categoriaSeleccionada
    );
  }

  get completadas(): number {
    return this.tareasFiltradas.filter(t => t.completada).length;
  }

  get pendientes(): number {
    return this.tareasFiltradas.filter(t => !t.completada).length;
  }
}
