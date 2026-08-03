import {Component, signal, Signal} from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { InputComponent } from './components/input/input';
import { ButtonComponent } from './components/button/button'

@Component({
  selector: 'app-root',
  imports: [
    InputComponent,
    ButtonComponent,
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './app.html',
  standalone: true,
  styleUrl: './app.css'
})

export class App {
  count = signal(0);
  username = '';
  saveUser() {
    console.log("hello app");
  }

  increment() {
    this.count.update(value => value + 1);
  }

  decrement() {
    this.count.update(value => value - 1);
  }

  reset() {
    this.count.set(0);
  }
}
