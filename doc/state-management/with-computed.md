# withComputed()

## Vue

ধরো

```ts
const firstName = ref('Md');
const lastName = ref('Akkas');

const fullName = computed(() => {
  return `${firstName.value} ${lastName.value}`;
});
```

এখানে

```text
firstName
lastName
```

↓

```text
fullName
```

নিজে নিজেই update হয়।

---

# Angular Signal Store

একই জিনিস

```text
State
↓
Computed
↓
UI
```

---

# Step 1

প্রথমে state একটু change করি।

```ts
import { signalStore, withState } from '@ngrx/signals';

export const UserStore = signalStore(
  { providedIn: 'root' },

  withState({
    firstName: 'Md',
    lastName: 'Akkas',
    age: 36,
  })
);
```

---

# এখন Computed যোগ করব

`withComputed()` import করো।

```ts
import {
  signalStore,
  withState,
  withComputed
} from '@ngrx/signals';

import { computed } from '@angular/core';
```

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
  }))
);
```

---

# Vue Comparison

Vue

```ts
const fullName = computed(() => {
    return firstName.value + " " + lastName.value;
});
```

Angular

```ts
fullName: computed(() =>
    `${store.firstName()} ${store.lastName()}`
)
```

একই concept।

---

# Step 3

Component

```ts
userStore = inject(UserStore);
```

---

Template

```html
<h2>{{ userStore.fullName() }}</h2>

<p>{{ userStore.age() }}</p>
```

Output

```text
Md Akkas

36
```

---

# Computed কখন update হবে?

ধরো

```text
firstName = Md

lastName = Akkas
```

↓

Computed

```text
Md Akkas
```

---

যদি

```text
firstName = Ali
```

হয়ে যায়

↓

Computed

```text
Ali Akkas
```

Automatic.

---

# একটা Real Example

State

```ts
withState({
    price:100,
    quantity:2
})
```

Computed

```ts
withComputed((store) => ({
    total: computed(() =>
        store.price() * store.quantity()
    )
}))
```

Template

```html
Total: {{ cartStore.total() }}
```

Output

```text
200
```

Price change

↓

```text
150
```

Output

↓

```text
300
```

নিজে নিজেই।

---

# আরেকটা Example

State

```ts
withState({

    user:null

})
```

Computed

```ts
withComputed((store) => ({

    isLoggedIn: computed(() =>
        store.user() !== null
    )

}))
```

Template

```html
@if(userStore.isLoggedIn()){

Dashboard

}
@else{

Login

}
```

এটাই production-এ খুব common।

---

# Pinia Mapping

Pinia

```ts
getters:{

    fullName(state){

        return state.firstName + " " + state.lastName;

    }

}
```

Signal Store

```ts
withComputed((store)=>({

    fullName: computed(() =>
        ...
    )

}))
```

---

# Vue → Angular

| Vue Pinia | Signal Store     |
| --------- | ---------------- |
| `state`   | `withState()`    |
| `getters` | `withComputed()` |
| `actions` | `withMethods()`  |

---

# একটা Practice

তুমি একটা `cart.state.ts` বানাও।

State:

```ts
price: 500,
quantity: 3
```

Computed:

```ts
total = price × quantity
```

Template:

```html
Price: {{ cartStore.price() }}

Quantity: {{ cartStore.quantity() }}

Total: {{ cartStore.total() }}
```

যদি `price` বা `quantity` change হয়, `total` যেন automatic update হয়।

---
