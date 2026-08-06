# withMethods

Excellent. এখন আমরা **Signal Store-এর সবচেয়ে গুরুত্বপূর্ণ অংশ** শিখব।

> **`withMethods()` = Pinia Actions**

এখান থেকেই Store সত্যিকারের useful হয়ে যায়।

---

# Vue

```ts
export const useCounterStore = defineStore('counter', () => {
    const count = ref(0);
    function increment() {
        count.value++;
    }
    function reset() {
        count.value = 0;
    }

    return {
        count,
        increment,
        reset
    };

});
```

এখানে

* `count` → State
* `increment()` → Action

---

# Angular Signal Store

একই জিনিস

```text
State
↓
Methods
↓
Update State
```

---

# Step 1

আগের Store

```ts
withState({
    firstName: 'Md',
    lastName: 'Akkas',
    age: 36,
})
```

এখন `withMethods()` যোগ করব।

---

# Import

```ts
import {
  signalStore,
  withState,
  withComputed,
  withMethods,
  patchState
} from '@ngrx/signals';

import { computed } from '@angular/core';
```

> **`patchState()`** হলো Store-এর state update করার helper।

---

# Step 2

```ts
export const UserStore = signalStore(
  { providedIn: 'root' },

  withState({
    firstName: 'Md',
    lastName: 'Akkas',
    age: 36,
  }),

  withComputed((store) => ({
    fullName: computed(() =>
      `${store.firstName()} ${store.lastName()}`
    ),
  })),

  withMethods((store) => ({

    changeFirstName(name: string) {
      patchState(store, {
        firstName: name,
      });
    },

  }))
);
```

---

# Component

```ts
userStore = inject(UserStore);
```

---

# Template

```html
<h2>{{ userStore.fullName() }}</h2>

<button (click)="userStore.changeFirstName('Ali')">
    Change Name
</button>
```

Output

Before

```text
Md Akkas
```

Click

↓

After

```text
Ali Akkas
```

খেয়াল করো,

**`fullName()`-কে কোথাও update করিনি।**

কারণ

```text
changeFirstName()

↓

State Update

↓

Computed Update

↓

UI Update
```

সব automatic।

---

# আরেকটা Example

Counter Store

```ts
withState({
    count: 0,
})
```

Methods

```ts
withMethods((store) => ({

    increment() {
        patchState(store, {
            count: store.count() + 1,
        });
    },

    decrement() {
        patchState(store, {
            count: store.count() - 1,
        });
    },

    reset() {
        patchState(store, {
            count: 0,
        });
    },

}))
```

Component

```html
<h2>{{ counterStore.count() }}</h2>

<button (click)="counterStore.increment()">
    +
</button>

<button (click)="counterStore.decrement()">
    -
</button>

<button (click)="counterStore.reset()">
    Reset
</button>
```

---

# Vue Mapping

Vue

```ts
count.value++;
```

Signal Store

```ts
patchState(store, {
    count: store.count() + 1
});
```

---

# Real Auth Example

State

```ts
withState({
    user: null,
    token: null,
    loading: false,
})
```

Methods

```ts
withMethods((store) => ({

    login(user: User) {

        patchState(store, {
            user,
        });

    },

    logout() {

        patchState(store, {
            user: null,
            token: null,
        });

    },

}))
```

Template

```html
@if(authStore.user()){

    Dashboard

}
@else{

    Login

}
```

এটাই production-এ খুব common।

---

# এখন একটা গুরুত্বপূর্ণ Design Principle

অনেকে শুরুতে এমন করে:

```html
<button (click)="userStore.changeFirstName('Ali')">
```

এটা demo-এর জন্য ঠিক আছে।

কিন্তু production-এ সাধারণত flow হয়:

```text
Component

↓

userStore.changeFirstName()

↓

Store

↓

patchState()
```

অথবা আরও বড় project-এ:

```text
Component

↓

userStore.loadUsers()

↓

UserService.getUsers()

↓

API

↓

patchState()
```

অর্থাৎ **Component কখনো state modify করবে না**, Store-ই modify করবে।

---

# Signal Store-এর Complete Mapping

| Vue Pinia          | Angular Signal Store |
| ------------------ | -------------------- |
| `state`            | `withState()`        |
| `getters`          | `withComputed()`     |
| `actions`          | `withMethods()`      |
| `store.user = ...` | `patchState()`       |

---

# 🎯 Practice

তোমার `UserStore`-এ নিচের methods যোগ করো:

```text
changeLastName(name)

increaseAge()

reset()
```

Rules:

* `changeLastName('Ali')`
* `increaseAge()` → age + 1
* `reset()` → firstName = "Md", lastName = "Akkas", age = 36

তারপর Template-এ ৩টা button দিয়ে test করো।

---

## এরপর কী?

Signal Store-এর basic API শেষ:

* ✅ `withState()`
* ✅ `withComputed()`
* ✅ `withMethods()`

এরপর আমরা **Production Auth Store** বানাবো, যেখানে থাকবে:

* `login()`
* `logout()`
* `currentUser`
* `token`
* `loading`
* API integration (`HttpClient`)
* Error handling

এটাই বাস্তব Angular project-এ সবচেয়ে বেশি ব্যবহৃত pattern।
