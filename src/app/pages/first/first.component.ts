import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as AOS from 'aos';

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.scss']
})
export class FirstComponent {

  constructor(
    private router: Router
  ) {

  }

  ngOnInit(): void {
    localStorage.setItem("isShow", "false");

    AOS.init({
      duration: 800,       // ความเร็ว animation
      once: false,         // ❌ false = ให้เล่นซ้ำได้ ไม่ใช่ครั้งเดียว
      mirror: true,        // ✅ true = เล่นย้อนกลับตอน scroll ขึ้น
      offset: 10           // เริ่ม animation เมื่อเข้า viewport 10px
    });

    setTimeout(() => {
      AOS.refresh(); // สำคัญมากหลัง *ngFor หรือโหลดข้อมูล async
    }, 100);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      const buttons = document.querySelectorAll('.btn-hero');
      buttons.forEach(btn => btn.classList.add('shrink'));
    }, 4000); // 2 วินาที
  }

  goTo(page: string) {
    switch (page) {
      case 'home':
        localStorage.setItem("isShow", "true");
        this.router.navigate(['/home']);
        break;
      case 'register':
        // this.router.navigate(['/register']);
        break;
      case 'support':
        // this.router.navigate(['/support']);
        break;
    }
  }

}
