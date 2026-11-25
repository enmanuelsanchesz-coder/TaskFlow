
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import {
  IonApp,
  IonRouterOutlet,
  IonMenu,
  IonContent,
  IonList,
  IonItem,
  IonIcon,
  IonLabel,
  IonMenuToggle,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonMenuButton
} from '@ionic/angular';

import { addIcons } from 'ionicons';

import {
  homeOutline,
  listOutline,
  statsChartOutline,
  menuOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [
    RouterLink,
    IonApp,
    IonRouterOutlet,
    IonMenu,
    IonContent,
    IonList,
    IonItem,
    IonIcon,
    IonLabel,
    IonMenuToggle,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonMenuButton
  ],
})
export class AppComponent {

  constructor() {
    addIcons({
      homeOutline,
      listOutline,
      statsChartOutline,
      menuOutline
    });
  }

  abrirMenu() {
    const menu = document.querySelector('ion-menu');
    if (menu) {
      (menu as any).open();
    }
  }
}
