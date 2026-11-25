import { Injectable } from '@angular/core';

export interface Tarea {
  id: number;
  titulo: string;
  categoria: string;
  hora: string;
  completada: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  tareas: Tarea[] = [
    {
      id: 1,
      titulo: 'Preparar proyecto universitario',
      categoria: 'Universidad',
      hora: '9:00 AM',
      completada: true
    },
    {
      id: 2,
      titulo: 'Revisar pendientes',
      categoria: 'Personal',
      hora: '11:00 AM',
      completada: true
    },
    {
      id: 3,
      titulo: 'Organizar el día',
      categoria: 'Personal',
      hora: '2:00 PM',
      completada: true
    },
    {
      id: 4,
      titulo: 'Revisar correos',
      categoria: 'Trabajo',
      hora: '3:00 PM',
      completada: true
    },
    {
      id: 5,
      titulo: 'Estudiar programación',
      categoria: 'Universidad',
      hora: '5:00 PM',
      completada: false
    },
    {
      id: 6,
      titulo: 'Probar nueva funcionalidad',
      categoria: 'Personal',
      hora: '6:56 PM',
      completada: false
    }
  ];

  agregarTarea(tarea: Tarea): void {
    this.tareas = [...this.tareas, tarea];
  }

  actualizarTarea(tareaActualizada: Tarea): void {
    this.tareas = this.tareas.map(tarea =>
      tarea.id === tareaActualizada.id ? tareaActualizada : tarea
    );
  }

  eliminarTarea(id: number): void {
    this.tareas = this.tareas.filter(tarea => tarea.id !== id);
  }
}