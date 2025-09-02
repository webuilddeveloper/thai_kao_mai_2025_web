import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as AOS from 'aos';
import { ServiceProvider } from 'src/app/shared/service-provider.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  deviceSize: string = '';
  modelAboutUs: any = {};

  constructor(
    private router: Router,
    private serviceProvider: ServiceProvider
  ) {}

  isInfoResiger = false;

  ngOnInit(): void {
    this.serviceProvider.SendIPAddress('register');
    this.deviceSize = localStorage.getItem('deviceSize') || '';
    AOS.init({
      duration: 800, // ความเร็ว animation
      once: false, // ❌ false = ให้เล่นซ้ำได้ ไม่ใช่ครั้งเดียว
      mirror: true, // ✅ true = เล่นย้อนกลับตอน scroll ขึ้น
      offset: 10, // เริ่ม animation เมื่อเข้า viewport 10px
    });

    setTimeout(() => {
      AOS.refresh(); // สำคัญมากหลัง *ngFor หรือโหลดข้อมูล async
    }, 100);

    this.readAboutMe();
  }

  gotoForm() {
    if (!this.isInfoResiger) {
      this.isInfoResiger = true;
      return;
    }


    this.router.navigate(['register-form'], {
      // skipLocationChange: true,
    });
  }

  readAboutMe() {
    this.serviceProvider.post('m/aboutUs/read', {}).subscribe((data) => {
      let model: any = {};
      model = data;
      this.modelAboutUs = model.objectData;
    });
  }

  downloadRegisForm() {
    (this.modelAboutUs.membershipApplication ?? '') != ''
      ? window.open(this.modelAboutUs.membershipApplication, '_blank')
      : null;
  }
}
