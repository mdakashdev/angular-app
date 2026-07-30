
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
# 7. Event

Child → Parent er jonno amra defineEmite use koreachilam
