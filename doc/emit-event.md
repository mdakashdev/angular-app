# Chapter 3 — `@Output()`

Vue developer হিসেবে এটা তোমার কাছে হবে:

> `defineEmits()` = `@Output()`

---

# Vue

Vue-তে তুমি লিখতে

```vue
<script setup lang="ts">
const emit = defineEmits(['click'])

function handleClick() {
    emit('click')
}
</script>

<template>
    <button @click="handleClick">
        Save
    </button>
</template>
```

Parent

```vue
<AppButton
    @click="saveUser"
/>
```

---

# Angular

Angular-এ এর equivalent

```ts
@Output()
```

---

# Step 1

`button.ts`

```ts
import { Component, EventEmitter, Input, Output } from '@angular/core';

type ButtonType = 'button' | 'submit' | 'reset';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class ButtonComponent {

  @Input() label = '';
  @Input() disabled = false;
  @Input() type: ButtonType = 'button';

  @Output() clicked = new EventEmitter<void>();

  handleClick() {
    this.clicked.emit();
  }

}
```

---

# এখানে কী হলো?

এই line

```ts
@Output() clicked = new EventEmitter<void>();
```

Vue

```ts
const emit = defineEmits(['click'])
```

এর equivalent।

---

```ts
this.clicked.emit();
```

Vue

```ts
emit('click')
```

এর equivalent।

---

# Step 2

`button.html`

```html
<button
  [type]="type"
  [disabled]="disabled"
  (click)="handleClick()"
>
  {{ label }}
</button>
```

এখন Button click হলে

```
handleClick()

↓

clicked.emit()
```

হবে।

---

# Step 3

Parent

`app.ts`

```ts
import { Component } from '@angular/core';
import { ButtonComponent } from './components/button/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  saveUser() {
    console.log('Saving User...');
  }

}
```

---

# Step 4

`app.html`

```html
<app-button
  label="Save"
  (clicked)="saveUser()">
</app-button>
```

---

# এখন পুরো Flow

```text
User Click

      │

      ▼

ButtonComponent

      │

handleClick()

      │

clicked.emit()

      │

      ▼

Parent

(clicked)

      │

saveUser()
```

---

# Vue vs Angular

| Vue                 | Angular                  |
| ------------------- | ------------------------ |
| `defineProps()`     | `@Input()`               |
| `defineEmits()`     | `@Output()`              |
| `emit('click')`     | `clicked.emit()`         |
| `@click="saveUser"` | `(clicked)="saveUser()"` |

---

# এখন একটা গুরুত্বপূর্ণ Observation

Vue-তে

```vue
<AppButton
    @click="save"
/>
```

Angular-এ

```html
<app-button
    (clicked)="saveUser()">
</app-button>
```

দেখছো?

Angular-এ **event name** তুমি নিজে define করছো।

```ts
@Output() clicked
```

তাই Parent-এ

```html
(clicked)
```

লিখছো।

যদি লিখতে

```ts
@Output() save = new EventEmitter<void>();
```

তাহলে Parent লিখত

```html
<app-button
    (save)="saveUser()">
</app-button>
```

---

# 🎯 Practice

তুমি এখন Button Component-এ নিচের feature implement করো।

Parent:

```html
<app-button
  label="Delete"
  (clicked)="deleteUser()">
</app-button>
```

`app.ts`

```ts
deleteUser() {
  console.log('Deleting User...');
}
```

Button click করলে Console-এ

```text
Deleting User...
```

আসতে হবে।

---

## একটা Design Tip (Senior Perspective)

আমি সাধারণত event-এর নাম **verb** না দিয়ে **past tense** বা **action completed** style-এ রাখি।

যেমন:

```ts
@Output() clicked = new EventEmitter<void>();
@Output() submitted = new EventEmitter<void>();
@Output() closed = new EventEmitter<void>();
@Output() valueChanged = new EventEmitter<string>();
```

এতে event পড়ে বোঝা যায় **কী ঘটেছে**, component-কে **কী করতে হবে** তা নয়। এটা reusable component design-এর একটি ভালো practice।

---

এরপরের chapter হবে **Custom Two-way Binding**, যেখানে তুমি বুঝবে:

```vue
v-model
```

আসলে কীভাবে কাজ করে, এবং Angular-এ

```html
[(value)]
```

কীভাবে নিজেই বানানো যায়। তখন `v-model` তোমার কাছে আর magic মনে হবে না।
