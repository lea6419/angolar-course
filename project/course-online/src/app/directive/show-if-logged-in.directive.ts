import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appShowIfLoggedIn]',
  standalone: true
})
export class ShowIfLoggedInDirective implements OnInit {
  
  @Input() appShowIfLoggedIn: boolean = false;


  constructor(private el: ElementRef, private renderer: Renderer2) {}
  ngOnInit() {
    // אם המשתמש מחובר (הערך true), נעשה שינוי צבע ואימוג'י
    if (this.appShowIfLoggedIn) {
      this.renderer.setStyle(this.el.nativeElement, 'color', 'green');  // שינוי צבע
      this.el.nativeElement.innerHTML += ' ✅';  // הוספת אימוג'י
    } else {
      this.renderer.setStyle(this.el.nativeElement, 'color', 'red');  // שינוי צבע אחרת
      this.el.nativeElement.innerHTML += ' ❌';  // הוספת אימוג'י אחר
    }
  }


}
