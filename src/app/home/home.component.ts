import { Component } from '@angular/core';
import { Title } from './title';

@Component({
  selector: 'home',
  providers: [
    Title
  ],
  styleUrls: [ './home.component.css' ],
  templateUrl: './home.component.html'
})
export class HomeComponent {

  constructor() {}

  ngOnInit() {
    console.log('hello `Home` component');

  }
}
