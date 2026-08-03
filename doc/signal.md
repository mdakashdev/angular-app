# Signals

**Signals** হচ্ছে Angular-এর সবচেয়ে বড় feature 

---

# প্রথমে একটা প্রশ্ন

Vue-তে আমরা কেন `ref()` ব্যবহার করি?

```ts
const count = ref(0);
```

কারণ:

* value store করবে
* value change হলে UI automatically update হবে

Angular-এ **ঠিক একই কাজ** করে `signal()`।

---

# Vue

```ts
const count = ref(0);
```

Template

```vue
{{ count }}
```

---

# Angular

`app.ts`

```ts
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  count = signal(0);

}
```

---

## Template

```html
<h2>{{ count() }}</h2>
```

খেয়াল করো

Vue

```vue
{{ count }}
```

Angular

```html
{{ count() }}
```

---

# প্রশ্ন

Angular-এ `count()` কেন?

কারণ `signal` একটা **function**।

```ts
count = signal(0);
```

এটা internally এরকম ভাবতে পারো

```ts
count()
```

↓

returns

```ts
0
```

---

# Value Change

Vue

```ts
count.value++;
```

Angular

```ts
count.set(10);
```

অথবা

```ts
count.update(value => value + 1);
```

---

# পুরো Example

`app.ts`

```ts
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  count = signal(0);

  increment() {
    this.count.update(value => value + 1);
  }

  decrement() {
    this.count.update(value => value - 1);
  }

}
```

---

`app.html`

```html
<h1>{{ count() }}</h1>

<button (click)="increment()">
  +
</button>

<button (click)="decrement()">
  -
</button>
```

---

# তিনটা Method

## 1. Read

```ts
count()
```

Vue

```ts
count.value
```

---

## 2. Set

```ts
count.set(100);
```

Vue

```ts
count.value = 100;
```

---

## 3. Update

```ts
count.update(value => value + 1);
```

Vue

```ts
count.value++;
```

---

# Mapping

| Vue                | Angular                    |
| ------------------ | -------------------------- |
| `ref(0)`           | `signal(0)`                |
| `count.value`      | `count()`                  |
| `count.value = 10` | `count.set(10)`            |
| `count.value++`    | `count.update(v => v + 1)` |

---

# এখন একটা Real Example

ধরো

```ts
username = signal('Akkas');
```

Template

```html
<h2>{{ username() }}</h2>
```

Method

```ts
changeName() {
    this.username.set('Ali');
}
```

Button

```html
<button (click)="changeName()">
    Change Name
</button>
```

Click

```
Akkas

↓

Ali
```

automatic UI update।

---

# Signals-এর সবচেয়ে বড় সুবিধা

আগে Angular-এ

```ts
username = 'Akkas';
```

এটাও UI update করত, কিন্তু Angular-এর change detection পুরো component tree check করত।

Signals-এর ক্ষেত্রে Angular জানে:

> **শুধু `username` signal change হয়েছে।**

তাই আরও targeted update করতে পারে।

---

# Vue Developer হিসেবে মনে রাখবে

Angular Signal **Vue `ref()`-এর clone না**, কিন্তু mental model প্রায় একই।

```text
Vue

ref()

↓

value

↓

UI update


Angular

signal()

↓

signal()

↓

UI update
```

---

# 🎯 Practice

তুমি নিজে এটা বানাও:

```ts
price = signal(100);
```

তারপর তিনটা button:

```text
Increase

Decrease

Reset
```

Rules:

* Increase → +10
* Decrease → -10
* Reset → 100

এতে `signal()`, `set()` এবং `update()`—তিনটিই practice হয়ে যাবে।

---

## এরপর আমরা শিখব

**`computed()`**

এটাই Vue-এর `computed()`-এর Angular equivalent।

উদাহরণ:

```ts
firstName = signal('Md');
lastName = signal('Akkas');
```

↓

```ts
fullName = computed(...)
```

এটা Angular Signals-এর পরের সবচেয়ে গুরুত্বপূর্ণ concept।
