# Store instance create

- 3 way : globally, component and route level

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


## Component level-এ provide করা

```ts
export const UserStore = signalStore(
   withState({
   firstname: 'Softzino',
   lastname: 'Tech',
   })
);
```


এখানে providedIn নেই। তারপর je কোনো component-এ: providers use korlei নতুন instance হবে  

```ts
@Component({
selector: 'app-user',
providers: [UserStore],
template: `...`
})
export class UserComponent {
userStore = inject(UserStore);
}
```

- এখন UserStore শুধু UserComponent এবং তার child components-এর জন্য available।
অর্থাৎ:


- Component-level provider হলে নতুন instance হবে এটাই সবচেয়ে interesting ব্যাপার।

```ts
@Component({
 providers: [UserStore]
 })
 export class UserComponent {
 store = inject(UserStore);
}
```

> এখন UserComponent-এর জন্য Angular একটি UserStore instance তৈরি করবে।

## Module/route-level injector-এও provide করা যায়
   
Angular-এর নতুন DI system-এ শুধু root বা component নয়, route-level providers-ও ব্যবহার করতে পারো।

```ts
export const routes: Routes = [
{
path: 'admin',
providers: [UserStore],
loadComponent: () => import('./admin.component')
}
];
```

এখন admin route-এর ভিতরের components UserStore inject করতে পারবে।
এটা useful যখন তুমি চাও:

"এই feature/route-এর জন্য একটা আলাদা store instance থাকবে।"

```text
সহজভাবে মনে রাখো
কোথায় provide করছো	Scope
providedIn: 'root'	পুরো application
providers: [UserStore] component-এ	component + children
route providers	ওই route/feature tree
```

