# Lesson 1 - withState()

## 

# Lesson 2 - withComputed()

## 

---


# State Management


```text
✅ Components
✅ @Input / @Output
✅ Two-way Binding
✅ Content Projection (ng-content)
✅ Basic Routing
✅ Signals (State)
✅ Services + Dependency Injection
✅ HTTP Client

↓

Reactive Forms

↓

State Management (Signal Store / NgRx / Akita / etc.)
```

কারণ Angular-এ **State Management বুঝতে হলে আগে Signals এবং Service বুঝতে হবে**।

---

## Vue Perspective

Vue-তে

```text
ref()

↓

reactive()

↓

provide/inject

↓

Pinia
```

তুমি কি `ref()` না শিখে Pinia শিখেছিলে?

না।

Angular-এও একই।

```text
signal()

↓

computed()

↓

effect()

↓

Service

↓

Global State (Signal Store / NgRx)
```

---

## Angular State-এর ৩টা Level

### Level 1 — Local State

Vue

```ts
const count = ref(0);
```

Angular

```ts
count = signal(0);
```

---

### Level 2 — Shared State

Vue

```text
provide/inject
```

Angular

```text
Service + Dependency Injection
```

---

### Level 3 — Global State

Vue

```text
Pinia
```

Angular

```text
Signal Store (recommended)
```

অথবা

```text
NgRx
```

---

## Angular 2026 Recommendation

আগে সবাই NgRx শিখত।

এখন Angular ecosystem-এ নতুন project-এর জন্য বেশিরভাগ ক্ষেত্রে recommendation হলো:

```text
Signals

↓

Services

↓

Signal Store
```

NgRx এখনও আছে, কিন্তু enterprise বা legacy project-এ বেশি দেখা যায়।

---

## আমি যেভাবে শেখাবো

### Chapter 1 — Signals

```ts
count = signal(0);
```

---

### Chapter 2 — computed

```ts
fullName = computed(() => test)
```

Vue

```ts
computed()
```

---

### Chapter 3 — effect

Vue

```ts
watch()
```

Angular

```ts
effect()
```

---

### Chapter 4 — Service

```bash
ng g s services/user
```

---

### Chapter 5 — Dependency Injection

Vue

```text
provide/inject
```

Angular

```text
constructor()

or

inject()
```

---

### Chapter 6 — Shared State

Service

↓

Signals

↓

Whole App

---

### Chapter 7 — Signal Store

Angular-এর Pinia।

---

## Vue Mapping

| Vue              | Angular        |
| ---------------- | -------------- |
| `ref()`          | `signal()`     |
| `computed()`     | `computed()`   |
| `watch()`        | `effect()`     |
| `provide/inject` | `Service + DI` |
| Pinia            | Signal Store   |

---

### আমি কী recommend করব?

**আজই State Management শুরু করব**, কিন্তু **Pinia equivalent দিয়ে না**।

আমরা শুরু করব:

> **Signals**

কারণ Angular Signals হলো Angular শেখার সবচেয়ে গুরুত্বপূর্ণ chapter।

Signals না বুঝে State Management শিখলে শুধু syntax শিখবে।

Signals বুঝলে State Management **নিজে নিজেই** পরিষ্কার হয়ে যাবে।

---

### পরবর্তী Lesson

আমরা একটা ছোট Counter বানাবো।

Vue:

```ts
const count = ref(0);
```

Angular:

```ts
count = signal(0);
```

এবং সেখান থেকেই ধীরে ধীরে Global State-এ যাব। এতে Vue থেকে Angular migration একদম natural লাগবে।

# Step - 1 : step by step (state management)

অবশ্যই শেখাবো। তবে একটা জিনিস পরিষ্কার করি।

তুমি Vue জানো, তাই আমি **Pinia → Signal Store** mapping দিয়ে শেখাবো। এতে খুব দ্রুত বুঝবে।

---

## প্রথমে প্রশ্ন

Vue-তে State Management মানেই কী?

উত্তর:

```text
Pinia
```

যেমন:

```ts
export const useUserStore = defineStore('user', () => {
  const user = ref(null);
  function login() {}
  function logout() {}

  return {
    user,
    login,
    logout
  };
});
```

ব্যবহার:

```ts
const userStore = useUserStore();
```

---

## Angular-এ?

Angular-এর official modern equivalent হলো:

```text
Signal Store
```

এটা `@ngrx/signals` package-এর অংশ।

---

## Architecture

```text
Component

↓

Signal Store

↓

HTTP Service

↓

API
```

Vue-তে:

```text
Component

↓

Pinia

↓

API
```

---

## Signal Store কী?

Signal Store হলো এমন একটি store যেখানে থাকবে:

* State
* Computed values
* Methods
* Business logic

এক জায়গায়।

---

## Vue

```ts
const count = ref(0);

const double = computed(() => count.value * 2);

function increment() {
    count.value++;
}
```

---

## Signal Store

```ts
count = signal(0);

double = computed(() => this.count() * 2);

increment() 
{ this.count.update(v => v + 1);}
```

একই idea।

---

## Installation

```bash
npm install @ngrx/signals
```

---

## Folder Structure

```text
stores/
    auth.store.ts
    user.store.ts
    cart.store.ts
```

Vue

```text
stores/
    auth.ts
    user.ts
```

প্রায় একই।

---

## Auth Store Example

```ts
export const AuthStore = signalStore();
```

এর মধ্যে থাকবে:

```text
state
↓
computed
↓
methods
```

---

## Vue Mapping

Pinia

```ts
state
```

↓

Signal Store

```ts
withState()
```

---

Pinia

```ts
getter
```

↓

Signal Store

```ts
withComputed()
```

---

Pinia

```ts
action
```

↓

Signal Store

```ts
withMethods()
```

---

## Mental Mapping

| Pinia   | Signal Store     |
| ------- | ---------------- |
| state   | `withState()`    |
| getters | `withComputed()` |
| actions | `withMethods()`  |

---

## Real Auth Store

State

```text
user
token
loading
isLoggedIn
```

Computed

```text
fullName

isAdmin
```

Methods

```text
login()

logout()

refresh()

loadUser()
```

---

## Production Flow

```text
Login Page

↓

authStore.login()

↓

HTTP Request

↓

Token Save

↓

User Update

↓

Navbar Update

↓

Profile Update

↓

Dashboard Update
```

একটা state change হলে সব component automatic update হবে।

---

## আমি যেভাবে শেখাবো

Signal Store অনেক API দেয়। সব একসাথে দেখলে confusing লাগবে।

> তাই আমরা ৫টা ছোট lesson-এ শিখব:

### Lesson 1

```text
withState()
```

শুধু state।

---

### Lesson 2

```text
withComputed()
```

Vue computed-এর equivalent।

---

### Lesson 3

```text
withMethods()
```

Pinia actions-এর equivalent।

---

### Lesson 4

HTTP Integration

---

### Lesson 5

Authentication Store (Production Pattern)

---

## আমার Recommendation

**Signal Store শেখার আগে** তুমি যে Angular 22 project বানিয়েছো, সেটাতেই আমরা Authentication Store বানাবো।

এতে একসাথে শিখবে:

* Login
* Logout
* Current User
* Token
* Loading
* Global State

এটা Vue-এর `useAuthStore()`-এর Angular equivalent হবে।

> **তবে একটা বিষয়:** Signal Store Angular-এর core package নয়; এটা `@ngrx/signals` package থেকে আসে। তাই শেখার আগে project-এ package install করতে হবে:

```bash
npm install @ngrx/signals
```

তারপর আমরা step by step `withState()`, `withComputed()`, `withMethods()` দিয়ে একটি production-style Auth Store তৈরি করব।


