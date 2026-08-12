# making basic global store

## Install NgRx or Signal Store

- NgRx or Signal Store - amra signal store use kortechi
- https://ngrx.io/guide/store/install
- https://ngrx.io/guide/signals/install
- global store use korar jonno `NgRx or Signal Store` install kora lagbe
- install signals -  `pnpm add @ngrx/signals`

## Create Store

- folder structure - stores/
- 5 ta lession a shikbo - state, computed, method, HTTP Integration and authentication

- Create a `stores` folder.
- Create store files inside it, for example, `user.store.ts`.
- Import `signalStore` from @ngrx/signals and using `signalStore`

## Registration & create state
- Import the store into the component where you want to use it.
- then inject korte hoi store ke like - store = inject(UserStore)
- Example: `create-state.md`

## Create Actions / Method
- Follow create-action.md

## Create Computed method
- Getter and Selector Approach
- Follow create-computed.md

# Basic Tasks

1. Create global store --> `done`
2. Create state with initial value -> `done`
3. Export store in any component or pages --> `done`
4. Use store / read state in multiple component --> `done`
5. Update state using Actions / Methods - so define method in store; like - `increment and decrement` --> `done`
6. Using computed / getter / selector --> `done`

