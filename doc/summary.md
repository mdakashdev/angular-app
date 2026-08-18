# Topics

- Build App
- Folder Structure (Pending)
- Create Component (Props, slot, two-way binding, Emit, Event)
- Route and Page
- Signal (as like ref)
- Services and Http Client (as like composable)
- Observable (Pending)
- Store (State Management)


# 1. Build App

## app start

```bash
ng serve
```

# 2. Folder Structure / Project Structure
- not started yet

# 3. Create Component

```text
angular a component create/generate korte hole command er maddhome korte hobe; 
akta scafold pabe (html, css, test and component file), jehetu comand diye kora hoi, so automatic components folder create kore fele.
then compnent register korlei dekha jai, kichu na korei - output pauwa jabe - button.html er gulo

component a selector er name diye template sei name ta element-tag er name hoi.
```

```bash
ng generate component components/button 
```

## component register 
- jekon page a jeye import kore then, imports [] array te diye dilei hoi.
- jehetu array te dite hoi, so eikhane multiple component diye deya jai.

## re-usable button create
- se jonno html element ta niye asbo then think korbo ki korte hobe;
```text
disabled, name , type = button, reset, submit, value
<button name="subject" type="submit" value="HTML">button</button>
```
- then amar custom button theke props pass korbo like
```text
<app-button
  name="subject"
  type="text"
>
</app-button>
```

# 4. Props 

- props kivabe declare korte hoi- @Input() use kore

- 3 jaigai kaj - app.html theke pass (parent) -> child 2 ta (button.ts a declare) and button.html a component er template a define kora
- app.html(parent) -> child(button.ts, button.html)
- typeScript er jonno alada type/interface declare kora jai, same to vue

# 5. slot
- Angular-এ `<slot>` নেই।
- but <ng-content></ng-content> ache, 
- component a amra jemon likhtam </slot> thik temoni likhbo <ng-content></ng-content>
- then jekhane button use korbo - sekhane just text likhe dibo. 
- `<ng-content>` যেখানে থাকবে, Parent-এর content সেখানে inject হবে।
- Angular-এ named slot-এর equivalent হলো **content projection with `select`**।
- https://angular.dev/guide/components/content-projection

# 6. two way binding
- as like v-model="username" -->  [(value)] = "username"

- app.ts parent:
  - ami parent app.ts theke v-model a username dibo, ja props er maddhome child a input.ts a dekhabe.
  - how ? 
  - vue hole ja kortam (parent - child): v-model="username" , const username = ref('');  then child a - props ta rcv kore `modelValue: string,` then `:value="modelValue"` input a peye jai
  - now angular - [(value)] = "username" , then username = ''; ---- after that child a , @Input() value = ''; and [value]="value"
- input.ts child:
  - child theke parent data dhorar jonno - (input) diye akta method call, sekhane theke value dhore, emit call korlei hoye jai, 
  - child a kono method dhora / listen kora lagen bec. [(value)] use korechi, eita use kora manei 
  - [value]="usernmae" (valueChange)="usernmae = $event"    
  - https://angular.dev/guide/templates/two-way-binding

# 7. Emit
- emit vue er concept er motoi, ekhane ami child theke parent a listen korbo, se jonno
- template part a, click a method call korbo - angular a template part hocche - button.html exm- `(click)="handleClick()"`
- then ei method ta script part a dhorbo, ekhane script part hocche - button.ts exm- handleClick() { this.tested.emit(); }
- listen korte hole, emit define korte hobe - @Output() clicked = new EventEmitter<void>(); eivabe define kore
- then method  theke emit call korbo, taholei listen hobe
- `parent a recv` : parent mane jekhane ami ei button use korechi - app.html - exmp -  `(clicked)="saveUser()"`
- amra jani same name (mane event name diye listen korte hobe) parent a - event name: clicked, sei jaigai saveUser diye use korbo

# 8. Event
- event kivabe dhora jai, seta running ache
- Child → Parent er jonno amra defineEmite use koreachilam

# 9. Routing and pages
- route korar jonno, page lagbe, so, vue er moto pages folder kore kora jai, but eita manually na kore genereate korlei hoi
- command: `ng generate component pages/home`
- vue a jemon routes akta folder kore route.ts akta file a route object create korte hoi.but ekhane app.route.ts name age theke akta file thake
- sekhanei path diye page dhoriye dilei hobe.
- then app.ts a RouterOutlet import kore, app.html a <router-outlet></router-outlet> hoye jai, as like `router-view` in vue

# 10. Signals

- ref() equivalent signal 
- signal import kore use kore jabe.
- count.value = 100;  -> equivalent count.set(100);

# 11. services
- service created - `ng generate service services/user`
- then user.ts file pabo. sekhane akta method nilam changeName then jekhane use korbo sekhane import kore niye inject kore dile
- sei inject er maddhome sei template mane html file a sob access pabo, and dynamically data change hobe

# 12. Observable
- not started yet

# 13. Http Client

- component theke directly call kora uchit na. ei jonno composable hoye asa ta valo.
- flow ta emon hote hobe: component - composable - api call (vue )
- component - service - http_client - backend (angular a)
- Enable HttpClient mane, provideHttpClient()` provider register korte hobe. in app.config.ts
- then http er madhome url get korlam.
- then service ta jekhane use korbo, sekhane import korbo aar inject kore dibo jeno template pai.
- component render hobar sathe jeno data load hoye takhe sei jonno `life cycle hook` use korbo - ngOnInit (as like onMounted)
- hook url https://angular.dev/guide/components/lifecycle
- then subscribe use kore, data gulo niyechi then template a use koreci.
 - subscribe()

# 14. State Management - NgRx https://ngrx.io/  or [Signal Store](https://ngrx.io/guide/signals/signal-store) (as like pinia)
- install korte hobe - pnpm install @ngrx/signals
- folder structure - stores/
- 5 ta lession a shikbo - state, computed, method, HTTP Integration and authentication 





# Vue Mapping

| Vue              | Angular        |
| ---------------- | -------------- |
| `ref()`          | `signal()`     |
| `computed()`     | `computed()`   |
| `watch()`        | `effect()`     |
| `provide/inject` | `Service + DI` |
| Pinia            | Signal Store   |

---

# Later

- [(ngModel)]
- "Observable কী? Promise থাকলে Observable কেন?"
- Promise 
- Observable 
- subscribe()
- pipe()
- map()
- HTTP Client (Advanced)
