import { Directive } from '@angular/core';

@Directive({
  selector: '[appShowIfLoggedIn]',
  standalone: true
})
export class ShowIfLoggedInDirective {

  constructor() { }

}
