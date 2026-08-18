# providedIn

> `{ providedIn: 'root' }` হচ্ছে এই পুরো `UserStore`-টাকে **Angular-এর root injector-এ globally available করার configuration**।

> মানে, এটিকে **globally available** করে দেওয়া হয়েছে। এখন যেকোনো component থেকে `inject(UserStore)` করলেই store-এর সবকিছু পাওয়া যাবে।

> অনেকটা Vue-এর **Provide / Inject** concept-এর মতো।


তোমার code:

```ts
export const UserStore = signalStore(
  { providedIn: 'root' },
);
```

### এখানে `{ providedIn: 'root' }` কী করছে?

এটা Angular-কে বলছে:

> **`UserStore`-কে root level-এ provide করো।**

অর্থাৎ app-এর যেকোনো component/service থেকে তুমি `UserStore` inject করতে পারবে।

যেমন:

```ts
export class UserComponent {
  userStore = inject(UserStore);
}
```

এখন:

```ts
userStore.firstname()
```

দিলে `"Softzino"` পাবে।

আর:

```ts
userStore.fullName()
```

দিলে:

```text
Softzino Tech
```

পাবে।

---


আর `{ providedIn: 'root' }` হচ্ছে এই পুরো `UserStore`-টাকে **Angular-এর root injector-এ globally available করার configuration**।

তাই Signal Store-এর ক্ষেত্রে এটাকে তুমি মোটামুটি এভাবে মনে রাখতে পারো:

> **`providedIn: 'root'` → এই store-এর একটি app-wide injectable instance তৈরি/ব্যবহার করো।**
