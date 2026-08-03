import { Component, Input, Output, EventEmitter } from '@angular/core';

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

  @Output() clicked = new EventEmitter<void>(); //declare defineEmit

  //emit call this.clicked.emit();

  handleClick() {
    this.clicked.emit(); //eita child, eita parent a listen korbe ;
    //console.log('test');
  }

  // count = 0;
  // save(){
  //   this.count++;
  //   //console.log('Button clicked')
  // }
}
