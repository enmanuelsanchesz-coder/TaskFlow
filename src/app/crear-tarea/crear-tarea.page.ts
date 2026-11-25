import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonInput,
  IonSelect,
  IonSelectOption
} from '@ionic/angular';

import { addIcons } from 'ionicons';
import {
  arrowBackOutline,
  checkmarkOutline,
  createOutline
} from 'ionicons/icons';

import { TaskService, Tarea } from '../task.service';

@Component({
  selector: 'app-crear-tarea',
  templateUrl: './crear-tarea.page.html',
  styleUrls: ['./crear-tarea.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonIcon,
    IonItem,
    IonLabel,
    IonInput,
    IonSelect,
    IonSelectOption
  ]
})
export class CrearTareaPage {

  titulo = '';
  categoria = 'Personal';
  hora = '';

  constructor(
    private taskService: TaskService,
    private router: Router
  ) {
    addIcons({
      arrowBackOutline,
      checkmarkOutline,
      createOutline
    });
  }

  guardarTarea(): void {
    if (!this.titulo.trim()) {
      return;
    }

    const horaFormateada = this.hora
      ? this.formatearHora(this.hora)
      : 'Sin hora';

    const nuevaTarea: Tarea = {
      id: Date.now(),
      titulo: this.titulo.trim(),
      categoria: this.categoria,
      hora: horaFormateada,
      completada: false
    };

    this.taskService.agregarTarea(nuevaTarea);

    this.router.navigate(['/home']);
  }

  volver(): void {
    this.router.navigate(['/home']);
  }

  private formatearHora(hora: string): string {
    if (!hora || !hora.includes(':')) {
      return hora;
    }

    const [horas, minutos] = hora.split(':');
    const horaNumero = Number(horas);
    const periodo = horaNumero >= 12 ? 'PM' : 'AM';
    const hora12 = horaNumero % 12 || 12;

    return `${hora12}:${minutos} ${periodo}`;
  }
}