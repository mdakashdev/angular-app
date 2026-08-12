## Create Action

```code
import {
  signalStore,
  withState,
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

  withMethods((store) => ({
    changeFirstName(name: string) {
      patchState(store, {
        firstname: name
      })
    }
  }))
  
);

```

- method create korar jonno `withMethods` use korechi
- state update korar jonno - `patchState` use kora hoyeche


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
<button (click)="store.changeFirstName('Ali')">
  Change Name
</button>
```

- then jei name a inject korechi, seta diye sobkichu dhorte pari.
