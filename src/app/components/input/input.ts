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
 *
 * Vue: Button.vue --> <Button />
 * Angular : selector: 'app-input'  -> <app-input></app-input>
 * Standard Naming Convention : file (user-card.ts), class (UserCardComponent), and Selector (app-user-card)
 */


/* VUE
<script setup lang="ts">
  // props,reactive state,methods,computed,watch,lifecycle hooks
  </script>
  <template>
  <!-- HTML --><!-- Components --><!-- Slots -->
  </template>
  <style scoped></style>
 */

/* Angular
@Component({
  selector: 'app-input',
  imports: [],
  templateUrl: './input.html',
  styleUrl: './input.css'
})
export class InputComponent {
  // @Input(),state,methods,computed (Signals),lifecycle hooks
}
 */
