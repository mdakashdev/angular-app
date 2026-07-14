# Angular 

## 3. Component Create
- ng generate component components/input
shortcut: 
> ng g c components/input

- basic component create
- define selector name, class name
- define props, jei gulo recv korbo
- make property bind in html file and design in css file for input component
- import input component in app.ts and implement it app.html



## 2. Folder Structure / Project Structure


## 1. Project Setup / Create Project

> If ERROR: The configured global bin directory "/Users/softzino/pnpm" is not in PATH

pnpm setup

source ~/.zshrc

pnpm install -g @angular/cli


The Angular CLI requires a minimum Node.js version of v22.22.3 or v24.15.0 or v26.0.0.
nvm install v22.22.3

ng new angular-app

✔Would you like to share pseudonymous usage data about this project with the Angular Team
at Google under? No

✔ Which stylesheet system would you like to use? CSS

✔ Do you want to enable Server-Side Rendering (SSR) and Static Site Generation (SSG/Prerendering)? No

✔ Which AI tools do you want to configure with Angular best practices? ◉ None

cd angular-app

ng serve

http://localhost:4200/
