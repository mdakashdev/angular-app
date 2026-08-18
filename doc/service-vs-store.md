# Service Vs Store

**এক লাইনে মনে রাখো:**

> **Service data নিয়ে আসে, Store data মনে রাখে।**


1. Service = Backend/API-এর সাথে কাজ করে

- Service-এর মূল কাজ: **data আনা/পাঠানো বা reusable business logic।**

2. Store = Application-এর state ধরে রাখে

- Store-এর মূল কাজ: **কোন data এখন application-এ আছে এবং UI-তে কী দেখাবে সেটা manage করা।**


Best Example Ever:

```text
UserService
    ↓
API থেকে 10 users আনলো
    ↓
UserStore
    ↓
users state-এ রাখলো
    ↓
Component
    ↓
10 users দেখালো
```


## Service = Backend/API-এর সাথে কাজ করে

```text
Service
  ↓
API
```

যেমন:

```ts
getUsers()
createUser()
updateUser()
deleteUser()
```

Service-এর মূল কাজ: **data আনা/পাঠানো বা reusable business logic।**

---

## Store = Application-এর state ধরে রাখে

```text
Store
  ↓
State
  ↓
Components
```

যেমন:

```ts
users
currentUser
isLoggedIn
loading
```

Store-এর মূল কাজ: **কোন data এখন application-এ আছে এবং UI-তে কী দেখাবে সেটা manage করা।**

---

## একসাথে দেখলে

```text
Component
    ↓
Store
    ↓
Service
    ↓
API
```

উদাহরণ:

```text
UserService
    ↓
API থেকে 10 users আনলো
    ↓
UserStore
    ↓
users state-এ রাখলো
    ↓
Component
    ↓
10 users দেখালো
```

## Vue-এর সাথে মিল

```text
Vue:
Composable / API Service → API
Pinia → State

Angular:
Service → API
Signal Store → State
```

**এক লাইনে মনে রাখো:**

> **Service data নিয়ে আসে, Store data মনে রাখে।**
