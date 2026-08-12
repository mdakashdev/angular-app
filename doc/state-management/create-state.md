## Create State

```angular
import {
  signalStore,
  withState,
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
);

```

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

## Implement in template

```angular
<h2>from store</h2>
<h2>{{ store.username() }}</h2>
<p>{{ store.age() }}</p>
<h2>{{ store.fullName() }}</h2>
```

## Example
- Follow korte paro - details `with-state.md`
