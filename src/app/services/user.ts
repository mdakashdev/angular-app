import { Service, signal } from '@angular/core';

@Service()
export class User {

  testname = signal('Akkas');

  changeName(name: string) {
    this.testname.set(name);
  }

}
