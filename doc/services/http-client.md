# HTTP Client

**HTTP Client কখনো Component থেকে directly call করা উচিত না** (production-এ)।

---

# Vue Perspective

Vue-তে তুমি হয়তো এমন লিখেছো:

```ts
// ❌ App.vue

import axios from 'axios';

const users = await axios.get('/users');
```

ছোট project-এ চলে।

Production-এ?

```text
Component

↓

Composable

↓

API Call
```

---

# Angular

Production-এ

```text
Component

↓

User Service

↓

Http Client

↓

Backend
```

এটাই Angular architecture।

---

# Step 1 — Enable HttpClient

Angular 22 standalone project-এ `app.config.ts`-এ add করতে হবে।

```ts
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient()
  ]
};
```

> **Vue Comparison:** Vue-তে যেমন `app.use(router)` করো, Angular-এ `provideHttpClient()` provider register করছো।

---

# Step 2 — Service

`user.ts`

```ts
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Service } from '@angular/core';

@Service()
export class User {

  private http = inject(HttpClient);

  getUsers() {
    return this.http.get('https://jsonplaceholder.typicode.com/users');
  }

}
```

খেয়াল করো

Vue

```ts
import axios from 'axios';
```

Angular

```ts
const http = inject(HttpClient);
```

---

# Step 3 — Component

`app.ts`

```ts
import { Component, inject } from '@angular/core';
import { User } from './services/user';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html'
})
export class App {

  userService = inject(User);

  users: any[] = [];

  ngOnInit() {
    this.userService.getUsers().subscribe(data => {
      this.users = data as any[];
    });
  }

}
```

---

# Step 4 — Template

```html
@for(user of users; track user.id){

<p>{{ user.name }}</p>

}
```

Output

```text
Leanne Graham

Ervin Howell

Clementine Bauch
```

---

# Vue Comparison

Vue

```ts
import axios from 'axios';

const users = ref([]);

onMounted(async () => {

  const response = await axios.get('/users');

  users.value = response.data;

});
```

Angular

```ts
users = [];

ngOnInit() {

  this.userService
      .getUsers()
      .subscribe(users => {

          this.users = users;

      });

}
```

---

# কিন্তু Angular-এ `subscribe()` কেন?

Vue

```text
Promise
```

Angular

```text
Observable
```

`HttpClient` **Promise return করে না**, **Observable** return করে।

তাই

```ts
this.http.get(...)
```

return type

```ts
Observable<User[]>
```

---

# Production Version

`user.ts`

```ts
getUsers() {
    return this.http.get<User[]>('/api/users');
}
```

Component

```ts
this.userService.getUsers().subscribe(users => {
    this.users = users;
});
```

`any` আর ব্যবহার করতে হবে না।

---

# Vue vs Angular Mapping

| Vue           | Angular       |
| ------------- | ------------- |
| axios         | HttpClient    |
| `axios.get()` | `http.get()`  |
| Promise       | Observable    |
| `await`       | `subscribe()` |
| `onMounted()` | `ngOnInit()`  |

---

# একটা গুরুত্বপূর্ণ প্রশ্ন

তুমি Vue-তে `await axios.get()` ব্যবহার করেছো।

এখন Angular-এ দেখলে:

```ts
this.http.get(...).subscribe(...)
```

স্বাভাবিকভাবেই প্রশ্ন আসবে:

> **"Observable কী? Promise থাকলে Observable কেন?"**

## আমার মতে এখানেই থামা উচিত।

কারণ **Observable** না বুঝে `HttpClient` শেখা মানে শুধু syntax মুখস্থ করা।

আমি suggest করব, পরের chapter হবে:

```text
Promise

↓

Observable

↓

subscribe()

↓

pipe()

↓

map()

↓

HTTP Client (Advanced)
```

তখন Angular-এর HTTP Client তোমার কাছে অনেক বেশি পরিষ্কার হবে, কারণ এর ভিত্তিই হলো **RxJS Observable**।
