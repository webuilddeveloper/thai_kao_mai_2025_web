import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject } from '@angular/core';

@Component({
  selector: 'app-go-to-top',
  templateUrl: './go-to-top.component.html',
  styleUrls: ['./go-to-top.component.scss']
})
export class GoToTopComponent {

  windowScrolled!: boolean;
    constructor(@Inject(DOCUMENT) private document: Document) {}
    @HostListener("window:scroll", [])
    onWindowScroll() {
        if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) {
            this.windowScrolled = true;
        }
       else if (this.windowScrolled && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 10) {
            this.windowScrolled = false;
        }
    }
    clickToTop() {
        (function smoothscroll() {
            var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
            if (currentScroll > 0) {
                // window.requestAnimationFrame(smoothscroll);
                window.scrollTo(0, 0);
            }
        })();
    }
    ngOnInit() {}
}
