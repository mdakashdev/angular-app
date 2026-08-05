# Service

- akta login() function 10 component a lagbe ki amra 10 ta component a likhi 
- ei jonno akta common file baniye seta component import kore kaj kori.

তবে Angular Service শুধু function রাখার জায়গা না। এটা Angular-এর **Dependency Injection (DI)** system-এর অংশ।


## প্রথম প্রশ্ন

Vue-তে যদি `login()` function ১০টা component-এ লাগে, কী করবে?

❌ প্রতিটা component-এ copy করবে?

না।

তুমি একটা file বানাবে।

```text
services/
    auth.ts
```

```ts
export function login() {

}
```

তারপর যেখানে দরকার

```ts
import { login } from '@/services/auth'
```

---

# Angular-এ?

Angular-এ একই কাজের জন্য **Service** ব্যবহার করা হয়।

তবে Angular Service শুধু function রাখার জায়গা না।

এটা Angular-এর **Dependency Injection (DI)** system-এর অংশ।

---

# Vue vs Angular

Vue

```text
utils/
services/
composables/
```

Angular

```text
services/
```

---

# Step 1

Service create

```bash
ng g s services/user
```

হবে

```text
services/

user.ts
```

---

# Step 2

```ts
import { Service, signal } from '@angular/core';

@Service()
export class User {

  testname = signal('Akkas');

  changeName(name: string) {
    this.testname.set(name);
  }

}

```

---

## Angular

Angular নিজেই Service তৈরি করে দেয়।


# কেন Service?

ধরো

Home

User List

Profile

Dashboard

সবখানেই

```text
getUsers()
```

লাগবে।

তখন

```text
Home

↓

UserService

↑

Profile

↑

Dashboard
```

সব একই service ব্যবহার করবে।

---

# তাহলে আমরা কী করব?

যেহেতু তুমি **Angular 22** শিখছো, তাই আমি তোমাকে **Angular 22 style**-এই শেখাবো। পুরনো `@Injectable()` style আর ব্যবহার করব না, যদি না legacy project নিয়ে কথা হয়।

তাহলে `user.ts` হবে:

```ts
import { Service, signal } from '@angular/core';

@Service()
export class User {

  username = signal('Akkas');

  changeName(name: string) {
    this.username.set(name);
  }

}
```

Component:

```ts
import { Component, inject } from '@angular/core';
import { User } from './services/user';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
})
export class App {

  user = inject(User);

}
```

Template:

```html
<h2>{{ user.username() }}</h2>

<button (click)="user.changeName('Ali')">
  Change
</button>
```

---

# Vue Comparison

Vue

```ts
// useUser.ts

const username = ref('Akkas');

function changeName(name: string) {
    username.value = name;
}

export function useUser() {
    return {
        username,
        changeName
    };
}
```

Angular 22

```ts
@Service()
export class User {

    username = signal('Akkas');

    changeName(name: string) {
        this.username.set(name);
    }

}
```

---
