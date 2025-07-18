import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cookie-banner',
  templateUrl: './cookie-banner.component.html',
  styleUrls: ['./cookie-banner.component.scss']
})
export class CookieBannerComponent implements OnInit {
  showBanner = false;
  isHiding = false;

  ngOnInit(): void {
    const accepted = localStorage.getItem('cookieAccepted');
    if (!accepted) {
      this.showBanner = true;
    }
  }

  acceptCookies() {
    localStorage.setItem('cookieAccepted', 'true');
    this.animateHide();
  }

  closeBanner() {
    this.animateHide();
  }

  private animateHide() {
    this.isHiding = true;
    setTimeout(() => {
      this.showBanner = false;
    }, 400); // ให้ตรงกับ transition duration
  }
}
