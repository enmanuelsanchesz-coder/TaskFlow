import type { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'crear-tarea',
    loadComponent: () =>
      import('./crear-tarea/crear-tarea.page').then((m) => m.CrearTareaPage),
  },
  {
    path: 'categorias',
    loadComponent: () =>
      import('./categorias/categorias.page').then((m) => m.CategoriasPage),
  },
  {
    path: 'estadisticas',
    loadComponent: () =>
      import('./estadisticas/estadisticas.page').then((m) => m.EstadisticasPage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];