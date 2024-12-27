import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initializeApp } from "firebase/app";
import { firebaseConfig } from '../../firebaseConfig';
import { NavbarComponent } from './components/navbar/navbar.component';
import { getFirestore } from 'firebase/firestore';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'chatters';
  constructor() {
    initializeApp(firebaseConfig);
    const db=getFirestore();

  }
}
