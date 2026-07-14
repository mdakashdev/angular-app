import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [],
  templateUrl: './input.html',
  styleUrl: './input.css'
})

export class InputComponent {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() disabled = false;
  @Input() readonly = false;
  @Input() required = false;
  @Input() type: 'text' | 'email' | 'number' = 'text';
}

/**
 * vue er : <script setup></script>  equivalent - export class Input {}
 * vue e props: defineProps({label:String}) equivalent : @Input() label = '';

 */

