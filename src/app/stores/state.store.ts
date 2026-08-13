import {
  signalStore,
  withState
} from '@ngrx/signals';

export const useStoreState = signalStore(

  { providedIn: 'root' },

  withState({
    count: 10,
    component: 'checkbox component'
  })

);
