
## app start

```bash
ng serve
```

# 2. Create Component

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

# 3. Props 

- props kivabe declare korte hoi- @Input() use kore

- 3 jaigai kaj - app.html theke pass (parent) -> child 2 ta (button.ts a declare) and button.html a component er template a define kora
- app.html(parent) -> child(button.ts, button.html)
- typeScript er jonno alada type/interface declare kora jai, same to vue


# 4. slot
# 5. two way binding


# 6. Emit
- emit vue er concept er motoi, ekhane ami child theke parent a listen korbo, se jonno
- template part a, click a method call korbo - angular a template part hocche - button.html exm- `(click)="handleClick()"`
- then ei method ta script part a dhorbo, ekhane script part hocche - button.ts exm- handleClick() { this.tested.emit(); }
- listen korte hole, emit define korte hobe - @Output() clicked = new EventEmitter<void>(); eivabe define kore
- then method  theke emit call korbo, taholei listen hobe
- `parent a recv` : parent mane jekhane ami ei button use korechi - app.html - exmp -  `(clicked)="saveUser()"`
- amra jani same name (mane event name diye listen korte hobe) parent a - event name: clicked, sei jaigai saveUser diye use korbo


# 7. Event
- event kivabe dhora jai, seta running ache
- Child → Parent er jonno amra defineEmite use koreachilam

