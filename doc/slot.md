# slot

চমৎকার। এখন Angular-এর **`<slot>` equivalent** শিখি।

---

# Vue

ধরো Button component:

```vue
<!-- BaseButton.vue -->

<template>
  <button>
    <slot />
  </button>
</template>
```

Parent

```vue
<BaseButton>
  Save
</BaseButton>
```

Output

```html
<button>Save</button>
```

---

# Angular

Angular-এ `<slot>` নেই।

Equivalent হলো:

```html
<ng-content></ng-content>
```

---

## Step 1

`button.html`

```html
<button
  [type]="type"
  [disabled]="disabled"
>
  <ng-content></ng-content>
</button>
```

---

## Step 2

Parent

```html
<app-button>
  Save
</app-button>
```

Output

```html
<button>Save</button>
```

---

# আরেকটা Example

Vue

```vue
<BaseButton>
  <span>💾</span>
  Save
</BaseButton>
```

Angular

```html
<app-button>
  <span>💾</span>
  Save
</app-button>
```

Output

```html
<button>
  <span>💾</span>
  Save
</button>
```

`<ng-content>` যেখানে থাকবে, Parent-এর content সেখানে inject হবে।

---

# Vue vs Angular

Vue

```vue
<button>
    <slot />
</button>
```

Angular

```html
<button>
    <ng-content></ng-content>
</button>
```

একই concept।

---

# Named Slot

Vue

```vue
<Card>

  <template #header>
      Header
  </template>

  Body

  <template #footer>
      Footer
  </template>

</Card>
```

---

Angular-এ named slot-এর equivalent হলো **content projection with `select`**।

`card.html`

```html
<div class="card">

  <div class="header">
    <ng-content select="[header]"></ng-content>
  </div>

  <div class="body">
    <ng-content></ng-content>
  </div>

  <div class="footer">
    <ng-content select="[footer]"></ng-content>
  </div>

</div>
```

Parent

```html
<app-card>

  <h2 header>Profile</h2>

  This is body content.

  <button footer>Save</button>

</app-card>
```

Output

```html
-------------------------
Profile
-------------------------

This is body content.

-------------------------
Save
-------------------------
```

---

# Multiple Slots

Vue

```vue
<slot name="left" />
<slot />
<slot name="right" />
```

Angular

```html
<ng-content select="[left]"></ng-content>

<ng-content></ng-content>

<ng-content select="[right]"></ng-content>
```

Parent

```html
<app-layout>

  <div left>
    Sidebar
  </div>

  Main Content

  <div right>
    Ads
  </div>

</app-layout>
```

---

# Vue vs Angular Mapping

| Vue                      | Angular                          |
| ------------------------ | -------------------------------- |
| `<slot />`               | `<ng-content></ng-content>`      |
| `<slot name="header" />` | `<ng-content select="[header]">` |
| `<template #header>`     | `<h2 header>` বা `<div header>`  |
| Default Slot             | Default `<ng-content>`           |

---

# একটা বাস্তব Button Example

তুমি এখন `label` prop বাদও দিতে পারো।

`button.html`

```html
<button
  [type]="type"
  [disabled]="disabled"
>
  <ng-content></ng-content>
</button>
```

Parent

```html
<app-button>
  Save
</app-button>

<app-button>
  Delete
</app-button>

<app-button>
  <span>➕</span>
  Create User
</app-button>
```

এতে Button আরও flexible হয়ে যায়।

---

## Senior Angular Tip

Angular-এ `@Input() label` এবং `<ng-content>`—দুটোই ব্যবহার হয়, তবে উদ্দেশ্য আলাদা।

* **`@Input()`** → যখন data (string, boolean, object ইত্যাদি) parent থেকে child-এ পাঠাতে চাও।
* **`<ng-content>`** → যখন parent component নিজের HTML/content child-এর নির্দিষ্ট জায়গায় render করতে চায়।

যেমন:

```html
<app-button [disabled]="isSaving">
  <span>💾</span>
  Save Changes
</app-button>
```

এখানে:

* `disabled` → `@Input()`
* `💾 Save Changes` → `<ng-content>`

এটাই Angular-এ reusable UI component তৈরির সবচেয়ে প্রচলিত pattern।
