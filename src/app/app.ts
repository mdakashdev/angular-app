import { Component } from '@angular/core';
import { InputComponent } from './components/input/input';

@Component({
  selector: 'app-root',
  imports: [InputComponent],
  templateUrl: './app.html',
  standalone: true,
  styleUrl: './app.css'
})
export class App {

}
