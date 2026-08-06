import { Component, inject } from '@angular/core';
import { UserStore } from '../../stores/user.store'

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.css',
})

export class AboutComponent {
  user = inject(UserStore)
}
