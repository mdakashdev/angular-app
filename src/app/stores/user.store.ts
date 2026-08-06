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

  withMethods((store) => ({
    changeFirstName(name: string) {
      patchState(store, {
        firstname: name
      })
    }
  }))
  
);
