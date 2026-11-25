
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController } from '@ionic/angular';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonMenuButton,
  IonContent,
  IonIcon,
  IonButton,
  IonCard,
  IonCardContent,
  IonProgressBar,
  IonModal,
  IonItem,
  IonLabel,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonList,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonRefresher,
  IonRefresherContent,
  IonFab,
  IonFabButton
} from '@ionic/angular';

import { addIcons } from 'ionicons';

import {
  notificationsOutline,
  listOutline,
  checkmarkCircleOutline,
  checkmarkOutline,
  addOutline,
  closeOutline,
  timeOutline,
  trashOutline
} from 'ionicons/icons';

import { TaskService, Tarea } from '../task.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonMenuButton,
    IonContent,
    IonIcon,
    IonButton,
    IonCard,
    IonCardContent,
    IonProgressBar,
    IonModal,
    IonItem,
    IonLabel,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonList,
    IonItemSliding,
    IonItemOptions,
    IonItemOption,
    IonRefresher,
    IonRefresherContent,
    IonFab,
    IonFabButton
  ]
})
export class HomePage {

  constructor(
    private alertController: AlertController,
    public taskService: TaskService
  ) {
    addIcons({
      notificationsOutline,
      listOutline,
      checkmarkCircleOutline,
      checkmarkOutline,
      addOutline,
      closeOutline,
      timeOutline,
      trashOutline
    });
  }

  get tareas(): Tarea[] {
    return this.taskService.tareas;
  }

  nuevoTitulo = '';
  nuevaCategoria = 'Personal';
  nuevaHora = '';
  mostrarFormulario = false;

  tareaEditandoId: number | null = null;

  private temporizadorLongPress: ReturnType<typeof setTimeout> | null = null;

  // Pinch / Zoom en imagen
  zoomImagen = 1;
  private distanciaPinchInicial = 0;
  private zoomInicial = 1;

  get totalTareas(): number {
    return this.tareas.length;
  }

  get tareasCompletadas(): number {
    return this.tareas.filter(t => t.completada).length;
  }

  get tareasPendientes(): number {
    return this.tareas.filter(t => !t.completada).length;
  }

  get porcentaje(): number {
    if (this.totalTareas === 0) return 0;
    return Math.round((this.tareasCompletadas / this.totalTareas) * 100);
  }

  get progreso(): number {
    if (this.totalTareas === 0) return 0;
    return this.tareasCompletadas / this.totalTareas;
  }

  get completadas(): number {
    return this.tareasCompletadas;
  }

  abrirFormulario(): void {
    this.tareaEditandoId = null;
    this.nuevoTitulo = '';
    this.nuevaCategoria = 'Personal';
    this.nuevaHora = '';
    this.mostrarFormulario = true;
  }

  editarTarea(tarea: Tarea): void {
    this.cancelarLongPress();

    this.tareaEditandoId = tarea.id;
    this.nuevoTitulo = tarea.titulo;
    this.nuevaCategoria = tarea.categoria;
    this.nuevaHora = this.convertirHoraA24(tarea.hora);
    this.mostrarFormulario = true;
  }

  cerrarFormulario(): void {
    this.mostrarFormulario = false;
    this.tareaEditandoId = null;
  }

  guardarTarea(): void {
    if (!this.nuevoTitulo.trim()) return;

    const horaFormateada = this.nuevaHora
      ? this.formatearHora(this.nuevaHora)
      : 'Sin hora';

    if (this.tareaEditandoId !== null) {
      const tareaActualizada: Tarea = {
        id: this.tareaEditandoId,
        titulo: this.nuevoTitulo.trim(),
        categoria: this.nuevaCategoria,
        hora: horaFormateada,
        completada: this.tareas.find(
          t => t.id === this.tareaEditandoId
        )?.completada ?? false
      };

      this.taskService.actualizarTarea(tareaActualizada);
      this.cerrarFormulario();
      return;
    }

    const nuevaTarea: Tarea = {
      id: Date.now(),
      titulo: this.nuevoTitulo.trim(),
      categoria: this.nuevaCategoria,
      hora: horaFormateada,
      completada: false
    };

    this.taskService.agregarTarea(nuevaTarea);
    this.cerrarFormulario();
  }

  cambiarEstado(tarea: Tarea): void {
    tarea.completada = !tarea.completada;
    this.taskService.actualizarTarea(tarea);
  }

  eliminarTarea(tarea: Tarea): void {
    this.cancelarLongPress();
    this.taskService.eliminarTarea(tarea.id);
  }

  // Long Press
  iniciarLongPress(tarea: Tarea): void {
    this.cancelarLongPress();

    this.temporizadorLongPress = setTimeout(() => {
      this.temporizadorLongPress = null;
      this.mostrarDetalles(tarea);
    }, 600);
  }

  cancelarLongPress(): void {
    if (this.temporizadorLongPress !== null) {
      clearTimeout(this.temporizadorLongPress);
      this.temporizadorLongPress = null;
    }
  }

  // Pinch: distancia inicial entre dos dedos
  iniciarPinch(event: TouchEvent): void {
    if (event.touches.length === 2) {
      const x = event.touches[0].clientX - event.touches[1].clientX;
      const y = event.touches[0].clientY - event.touches[1].clientY;

      this.distanciaPinchInicial = Math.sqrt(x * x + y * y);
      this.zoomInicial = this.zoomImagen;
    }
  }

  // Pinch: acercar o alejar imagen
  detectarPinch(event: TouchEvent): void {
    if (event.touches.length === 2 && this.distanciaPinchInicial > 0) {
      const x = event.touches[0].clientX - event.touches[1].clientX;
      const y = event.touches[0].clientY - event.touches[1].clientY;

      const distanciaActual = Math.sqrt(x * x + y * y);
      const factor = distanciaActual / this.distanciaPinchInicial;

      this.zoomImagen = Math.min(
        Math.max(this.zoomInicial * factor, 1),
        2.5
      );
    }
  }

  finalizarPinch(): void {
    this.distanciaPinchInicial = 0;
  }

  // Zoom con rueda del mouse en PC
  ajustarZoomConRueda(event: WheelEvent): void {
    event.preventDefault();

    if (event.deltaY < 0) {
      this.zoomImagen = Math.min(this.zoomImagen + 0.15, 2.5);
    } else if (event.deltaY > 0) {
      this.zoomImagen = Math.max(this.zoomImagen - 0.15, 1);
    }
  }

  async mostrarDetalles(tarea: Tarea): Promise<void> {
    this.cancelarLongPress();

    const alert = await this.alertController.create({
      header: 'Detalles de la tarea',
      message:
        '<strong>Tarea:</strong> ' + this.escaparHTML(tarea.titulo) + '<br><br>' +
        '<strong>Categoría:</strong> ' + this.escaparHTML(tarea.categoria) + '<br><br>' +
        '<strong>Hora:</strong> ' + this.escaparHTML(tarea.hora) + '<br><br>' +
        '<strong>Estado:</strong> ' +
        (tarea.completada ? 'Completada' : 'Pendiente'),
      buttons: ['Cerrar']
    });

    await alert.present();
  }

  private escaparHTML(texto: string): string {
    return texto
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  refrescarTareas(event: any): void {
    setTimeout(() => {
      event.target.complete();
    }, 800);
  }

  private formatearHora(hora: string): string {
    if (!hora || !hora.includes(':')) return hora;

    const [horas, minutos] = hora.split(':');
    const horaNumero = Number(horas);
    const periodo = horaNumero >= 12 ? 'PM' : 'AM';
    const hora12 = horaNumero % 12 || 12;

    return `${hora12}:${minutos} ${periodo}`;
  }

  private convertirHoraA24(hora: string): string {
    if (!hora || hora === 'Sin hora') return '';

    const partes = hora.match(/(\d{1,2}):(\d{2})\s?(AM|PM)/i);
    if (!partes) return '';

    let horas = Number(partes[1]);
    const minutos = partes[2];
    const periodo = partes[3].toUpperCase();

    if (periodo === 'PM' && horas !== 12) horas += 12;
    if (periodo === 'AM' && horas === 12) horas = 0;

    return `${String(horas).padStart(2, '0')}:${minutos}`;
  }
}
