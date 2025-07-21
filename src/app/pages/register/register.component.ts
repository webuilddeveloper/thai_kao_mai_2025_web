import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as AOS from 'aos';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
    deviceSize: string = '';

  constructor(private router: Router,) {

  }

  ngOnInit(): void {
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

  gotoForm() {
    this.router.navigate(["register-form"], {
      // skipLocationChange: true,
    });
  }
}
