## Create Computed

```code
import {
  signalStore,
  withState,
  withComputed,
  withMethods,
  patchState
} from '@ngrx/signals';

import { computed } from '@angular/core';

export const UserStore = signalStore(
  { providedIn: 'root' },

  withState({
    username: 'test',
    firstname: "Softzino",
    lastname: "Tech",
    age: 36,
  }),

  withComputed((store) => ({
    fullName: computed(() =>
      `${store.firstname()} ${store.lastname()}`
    ),
  })),
  
);
```

- computed er jonno `withComputed` import kore  computed method korte hobe
- sob value pabar jonno argument nite hobe - like (store), aar eita diye state er sob pauwa jabe

## Register in component

```angular
import { Component, signal, inject } from '@angular/core';
import { InputComponent } from './components/input/input';
import { UserStore } from './stores/user.store'

@Component({
  selector: 'app-root',
  imports: [
    InputComponent,
  ],
  templateUrl: './app.html',
  standalone: true,
  styleUrl: './app.css'
})

export class App {
  count = signal(0);
  store = inject(UserStore)
}
```

- store like `UserStore` import kore then `inject` korte hoi jeno template (html a) store er sob kichu pauwa jai

## Implement in template

```angular
<h2>from store</h2>
<h2>{{ store.username() }}</h2>
<p>{{ store.age() }}</p>
<h2>{{ store.fullName() }}</h2>
```
- then jei name a inject korechi, seta diye sobkichu dhorte pari.
