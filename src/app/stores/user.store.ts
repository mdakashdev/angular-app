import { signalStore, withState } from '@ngrx/signals';

export const UserStore = signalStore(
  { providedIn: 'root' },

  withState({
    username: 'test',
    age: 36,
  })
);
