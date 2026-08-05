import { Service, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Service()
export class User {

  private http = inject(HttpClient);

  testname = signal('Akkas');

  changeName(name: string) {
    this.testname.set(name);
  }

  getUsers() {
    return this.http.get("https://jsonplaceholder.typicode.com/users");
  }

}
