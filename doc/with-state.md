# withState()

# আজকের Goal

শুধু **State**।

Vue-তে:

```ts
const count = ref(0);
```

Angular Signal Store-এ:

```ts
withState({
  count: 0
})
```

এটাই আজ শিখব।

---

# Step 1 — Install

```bash
npm install @ngrx/signals
```

---

# Step 2 — Folder Structure

আমি Angular project-এ সাধারণত এভাবে রাখি।

```text
stores/
    auth.store.ts
    user.store.ts
    cart.store.ts
```

Vue-তেও তো একই রকম করো।

```text
stores/
    auth.ts
    user.ts
```

---

# Step 3 — User Store

`stores/user.store.ts`

```ts
import { signalStore, withState } from '@ngrx/signals';

export const UserStore = signalStore(
  { providedIn: 'root' },

  withState({
    username: 'Akkas',
    age: 36,
  })
);
```

---

## Vue Comparison

Vue Pinia

```ts
export const useUserStore = defineStore('user', () => {

    const username = ref("Akkas");
    const age = ref(36);

    return {
        username,
        age
    };

});
```

Angular

```ts
export const UserStore = signalStore(

    withState({
        username:"Akkas",
        age:36
    })

);
```

**Mental model একদম একই।**

---

# Step 4 — Component থেকে ব্যবহার

`app.ts`

```ts
import { Component, inject } from '@angular/core';
import { UserStore } from './stores/user.store';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
})
export class App {

  user = inject(UserStore);

}
```

Vue

```ts
const user = useUserStore();
```

Angular

```ts
user = inject(UserStore);
```

---

# Step 5 — Template

```html
<h2>{{ user.username() }}</h2>
<p>{{ user.age() }}</p>
```

---

## খেয়াল করো

Store-এর প্রতিটি property একটা **Signal**।

তাই

```html
{{ user.username() }}
```

এবং

```html
{{ user.age() }}
```

লিখতে হবে।

---

# Vue Mapping

Vue

```ts
username.value
```

Template

```vue
{{ username }}
```

Angular

```ts
username()
```

Template

```html
{{ user.username() }}
```

---

# Architecture

```text
Component
↓
inject(UserStore)
↓
Store
↓
State
```

---

# এটা Pinia-এর কোন অংশ?

এটা শুধু

```ts
state
```

অর্থাৎ এখনও

* ❌ getter নেই
* ❌ action নেই
* ❌ computed নেই

শুধু state।

---

# Production Example

```ts
withState({
    user:null,
    token:null,
    loading:false,
    language:"en",
    theme:"light"

})
```

একটা Auth Store-এর শুরু সাধারণত এভাবেই হয়।

---

# Vue vs Angular

| Vue Pinia        | Signal Store        |
| ---------------- | ------------------- |
| `defineStore()`  | `signalStore()`     |
| `state`          | `withState()`       |
| `useUserStore()` | `inject(UserStore)` |

---

# 🎯 Practice

একটা `cart.store.ts` বানাও।

State রাখো:

```ts
items: 0,
total: 0,
currency: 'BDT'
```

তারপর `App` component-এ inject করে দেখাও:

```html
Items: {{ cart.items() }}
Total: {{ cart.total() }}
Currency: {{ cart.currency() }}
```

---
