import { Component, Input, Output } from '@angular/core';

type ButtonType = 'button' | 'reset' | 'submit';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.css',
})
//need defineEmits() -> emit('event', value);
// @output()
export class ButtonComponent {
  @Input() name = '';
  @Input() label = '';
  @Input() type: ButtonType = 'button';
  @Input() disabled = false;

  count = 0;
  save(){
    this.count++;
    //console.log('Button clicked')
  }
}
