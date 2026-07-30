import { Component, Input } from '@angular/core';

type ButtonType = 'button' | 'reset' | 'submit';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.css',
})

export class ButtonComponent {
  @Input() name = '';
  @Input() label = '';
  @Input() type: ButtonType = 'button';
  @Input() disabled = false;
}
