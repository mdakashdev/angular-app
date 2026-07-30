import { Component } from '@angular/core';
import { InputComponent } from './components/input/input';
import { ButtonComponent } from './components/button/button'

@Component({
  selector: 'app-root',
  imports: [InputComponent, ButtonComponent],
  templateUrl: './app.html',
  standalone: true,
  styleUrl: './app.css'
})

export class App {

}
