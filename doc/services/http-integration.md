এখন আমরা **Signal Store + HTTP Integration** শিখব।

এটাই production Angular-এর আসল pattern।

---

# Vue-তে তুমি কী করতে?

ধরো Pinia।

```ts
export const useUserStore = defineStore('user', () => {

    const users = ref([]);

    async function loadUsers() {

        const res = await axios.get('/users');

        users.value = res.data;

    }

    return {
        users,
        loadUsers
    };

});
```

Component

```ts
const userStore = useUserStore();

onMounted(() => {

    userStore.loadUsers();

});
```

---

# Angular Production Flow

Angular-এ Store নিজে HTTP call করবে না।

Flow হবে:

```text
Component

↓

User Store

↓

User Service

↓

HttpClient

↓

API

↓

Store Update

↓

UI Update
```

এটাই clean architecture।

---

# Step 1 — User Service

`services/user.ts`

```ts
import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Service()
export class User {

  private http = inject(HttpClient);

  getUsers() {
    return this.http.get<any[]>(
      'https://jsonplaceholder.typicode.com/users'
    );
  }

}
```

Service-এর একটাই কাজ:

> Backend-এর সাথে কথা বলা।

---

# Step 2 — Store

এখন Store-এর কাজ:

* Service call করা
* State update করা

```ts
import { inject } from '@angular/core';
import {
  signalStore,
  withState,
  withMethods,
  patchState
} from '@ngrx/signals';

import { User } from '../services/user';

export const UserStore = signalStore(

  { providedIn: 'root' },

  withState({

    users: [] as any[],
    loading: false,

  }),

  withMethods((store) => {

    const userService = inject(User);

    return {

      loadUsers() {

        patchState(store, {
          loading: true,
        });

        userService.getUsers().subscribe(users => {

          patchState(store, {

            users,
            loading: false,

          });

        });

      }

    };

  })

);
```

---

# Step 3 — Component

দেখো, Component এখন আর HTTP জানেই না।

```ts
import { Component, inject } from '@angular/core';
import { UserStore } from './stores/user.store';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html'
})
export class App {

  userStore = inject(UserStore);

  ngOnInit() {

    this.userStore.loadUsers();

  }

}
```

---

# Step 4 — Template

```html
@if(userStore.loading()){

    <p>Loading...</p>

}
@else {

    @for(user of userStore.users(); track user.id){

        <p>{{ user.name }}</p>

    }

}
```

---

# Vue Comparison

Vue

```ts
await axios.get()
```

↓

```ts
users.value = res.data
```

Angular

```ts
userService.getUsers()
```

↓

```ts
patchState(store,{
    users
})
```

---

# Architecture

```text
App Component
       │
       ▼
userStore.loadUsers()
       │
       ▼
UserService.getUsers()
       │
       ▼
HttpClient
       │
       ▼
API
       │
       ▼
patchState()
       │
       ▼
UI Update
```

---

# কেন Component থেকে API Call করব না?

অনেকে শুরুতে এটা করে:

```ts
ngOnInit() {

    this.userService.getUsers().subscribe(...)

}
```

এটা ছোট project-এ ঠিক আছে।

কিন্তু বড় project-এ?

ধরো:

* Dashboard
* Users Page
* Admin Panel

সব জায়গায় একই logic copy হবে।

Store ব্যবহার করলে:

```ts
this.userStore.loadUsers();
```

সব business logic Store-এর মধ্যে থাকে।

---

# Production Improvement

এখনও একটা সমস্যা আছে।

```ts
.subscribe(...)
```

এর error handle করিনি।

Production-এ হবে:

```ts
userService.getUsers().subscribe({

    next: (users) => {

        patchState(store,{
            users,
            loading:false
        });

    },

    error: () => {

        patchState(store,{
            loading:false
        });

    }

});
```

---

# Vue → Angular Mapping

| Vue Pinia           | Angular Signal Store     |
| ------------------- | ------------------------ |
| `state`             | `withState()`            |
| `getters`           | `withComputed()`         |
| `actions`           | `withMethods()`          |
| `axios.get()`       | `UserService.getUsers()` |
| `users.value = ...` | `patchState()`           |

---

## একটি গুরুত্বপূর্ণ নোট (Senior Perspective)

তুমি যদি ২০২৬ সালের modern Angular project-এ কাজ করো, তাহলে সাধারণত architecture হবে:

```text
Component
    ↓
Signal Store
    ↓
Service
    ↓
HttpClient
    ↓
Backend API
```

আর legacy Angular project-এ (বিশেষ করে Angular 12–17) অনেক সময় দেখবে:

```text
Component
    ↓
Service
    ↓
HttpClient
```

অর্থাৎ Store-ই থাকবে না। তাই দুটো pattern-ই চিনে রাখা দরকার, কিন্তু নতুন project-এর জন্য Signal Store pattern শিখলে তুমি ভবিষ্যতের Angular ecosystem-এর সঙ্গে তাল মিলিয়ে চলতে পারবে।
