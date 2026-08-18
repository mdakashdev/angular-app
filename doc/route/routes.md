# Routes

# Chapter 4 — Routing (Vue Router → Angular Router)

প্রথমে Vue-এর সাথে compare করি।

## Vue

```ts
// router/index.ts

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/users',
    component: User
  }
]
```

Template

```vue
<router-view />
```

Navigate

```vue
<router-link to="/users">
    Users
</router-link>
```

---

# Angular

Angular-এ তিনটা জিনিস আছে।

```text
app.routes.ts

↓

Router

↓

<router-outlet>
```

এগুলো Vue Router-এর equivalent।

---

# Angular Routing Structure

```text
src/app

app.ts
app.html
app.config.ts
app.routes.ts
```

Angular 17+ এ routing এভাবেই থাকে।

---

# Step 1

Create Pages

```bash
ng g c pages/home
```

```bash
ng g c pages/about
```

এখন হবে

```text
pages/

    home/
        home.ts
        home.html

    about/
        about.ts
        about.html
```

---

# Step 2

home.html

```html
<h2>Home Page</h2>
```

about.html

```html
<h2>About Page</h2>
```

---

# Step 3

`app.routes.ts`

```ts
import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home';
import { AboutComponent } from './pages/about/about';

export const routes: Routes = [

    {
        path: '',
        component: HomeComponent
    },

    {
        path: 'about',
        component: AboutComponent
    }

];
```

---

## Vue Comparison

Vue

```ts
{
    path: '/about',
    component: About
}
```

Angular

```ts
{
    path: 'about',
    component: AboutComponent
}
```

একই concept।

---

# Step 4

`app.html`

```html
<h1>Angular Routing</h1>

<nav>

    <a routerLink="/">Home</a>

    |

    <a routerLink="/about">About</a>

</nav>

<hr>

<router-outlet></router-outlet>
```

---

## Vue

```vue
<router-link to="/about">
```

Angular

```html
<a routerLink="/about">
```

---

## Vue

```vue
<router-view />
```

Angular

```html
<router-outlet></router-outlet>
```

---

# Step 5

`app.ts`

```ts
import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}
```

---

# Vue vs Angular

| Vue               | Angular           |
| ----------------- | ----------------- |
| Vue Router        | Angular Router    |
| `router/index.ts` | `app.routes.ts`   |
| `<router-view>`   | `<router-outlet>` |
| `<router-link>`   | `routerLink`      |
| `useRouter()`     | `Router` service  |
| `useRoute()`      | `ActivatedRoute`  |

---

# Programmatic Navigation

Vue

```ts
const router = useRouter();

router.push('/about');
```

Angular

```ts
import { Router } from '@angular/router';

constructor(private router: Router) {}

goAbout() {
    this.router.navigate(['/about']);
}
```

> **নোট:** Angular-এর আধুনিক API-তে `inject(Router)` ব্যবহারও খুব common, সেটা আমরা Dependency Injection chapter-এ শিখব।

---

# Roadmap

Routing chapter-এ আমি এভাবে এগোবো:

### Part 1 ✅ Basic Routing

* Route
* RouterOutlet
* RouterLink

### Part 2

* Dynamic Route

```
/users/10
```

### Part 3

* Route Parameters

```ts
id = route.snapshot.paramMap.get('id');
```

### Part 4

* Query Parameters

```
/users?page=1
```

### Part 5

* Nested Routing

### Part 6

* Lazy Loading

### Part 7

* Route Guard (Authentication)

---

## 🎯 Practice

এখন তুমি নিজে নিচের route-গুলো যোগ করার চেষ্টা করো:

* `/contact` → `ContactComponent`
* `/login` → `LoginComponent`

তারপর `app.html`-এ navigation bar বানাও:

```text
Home | About | Contact | Login
```

এটা করতে পারলে Angular Routing-এর foundation তোমার পরিষ্কার হয়ে যাবে।
