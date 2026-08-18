# Two way binding

> **Vue `v-model` এবং Angular Two-way Binding একই idea-এর উপর তৈরি।**

---

# Vue

তুমি লিখো:

```vue
<BaseInput v-model="name" />
```

কিন্তু Vue compiler এটাকে internally বানায়:

```vue
<BaseInput
  :modelValue="name"
  @update:modelValue="name = $event"
/>
```

অর্থাৎ

```text
Props

+

Emit

↓

v-model
```

---

# Angular-এও একই

Angular-এর custom two-way binding:

```html
<app-input [(value)]="name"></app-input>
```

Internally Angular এটাকে বানায়:

```html
<app-input
  [value]="name"
  (valueChange)="name = $event">
</app-input>
```

দেখো, এখানেও:

```text
@Input()

+

@Output()

↓

Two-way Binding
```

একদম Vue-এর মতো।

---

# Step 1 — InputComponent

`input.ts`

```ts
import { Component, EventEmitter, Input, Output } from '@angular/core';

type InputType = 'text' | 'email' | 'number';

@Component({
  selector: 'app-input',
  standalone: true,
  templateUrl: './input.html',
  styleUrl: './input.css'
})
export class InputComponent {

  @Input() label = '';
  @Input() placeholder = '';
  @Input() type: InputType = 'text';

  // v-model value
  @Input() value = '';

  // update:modelValue এর equivalent
  @Output() valueChange = new EventEmitter<string>();

  onInput(event: Event) {
    const input = event.target as HTMLInputElement;

    this.value = input.value;

    this.valueChange.emit(this.value);
  }
}
```

---

# Step 2 — input.html

```html
<label>{{ label }}</label>

<input
  [type]="type"
  [placeholder]="placeholder"
  [value]="value"
  (input)="onInput($event)"
/>
```

খেয়াল করো:

```html
[value]="value"
```

মানে Parent → Child

আর

```html
(input)="onInput($event)"
```

মানে Child → Parent

---

# Step 3 — Parent

`app.ts`

```ts
import { Component } from '@angular/core';
import { InputComponent } from './components/input/input';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [InputComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  name = '';

}
```

---

# Step 4

`app.html`

```html
<app-input
  label="Name"
  placeholder="Enter your name"
  [(value)]="name">
</app-input>

<p>{{ name }}</p>
```

---

# Flow

```text
Parent

name = ""

        │

        ▼

[value]="name"

        │

        ▼

InputComponent

User types

        │

        ▼

valueChange.emit()

        │

        ▼

Parent

name updated

        │

        ▼

<p>{{ name }}</p>
```

---

# Vue Comparison

Vue

```vue
<BaseInput v-model="name" />
```

Angular

```html
<app-input [(value)]="name"></app-input>
```

---

Vue internal

```vue
:modelValue="name"

@update:modelValue="..."
```

Angular internal

```html
[value]="name"

(valueChange)="..."
```

---

# তাহলে `[(value)]` কেন কাজ করল?

Angular-এর একটা naming convention আছে।

যদি থাকে:

```ts
@Input() value;
```

এবং

```ts
@Output() valueChange;
```

তাহলে Angular automatic বুঝে যায়:

```html
[(value)]
```

এটা দুইটার combination।

---

# এবার `ngModel` বুঝি

Angular-এর built-in input component আগেই এই convention follow করে।

তাই তুমি লিখতে পারো:

```html
<input [(ngModel)]="name">
```

কারণ Angular internally already implement করে রেখেছে:

```text
[ngModel]

+

(ngModelChange)

↓

[(ngModel)]
```

---
