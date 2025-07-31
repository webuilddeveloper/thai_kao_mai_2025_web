import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ServiceProvider } from 'src/app/shared/service-provider.service';
import * as AOS from 'aos';
import { gsap } from 'gsap';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  isShow = 'false'; // เพิ่มตรงนี้

  aboutMeModel: any = {
    location: "8819 Ohio St. South Gate, CA 90280",
    email: "Ourstudio@hello.com",
    tel: "+1 386-688-3295"
  };
  contact = {
    address: 'Borem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio',
    email: 'xxxxxxxx@gmail.com',
    phone: '02–123–4567',
    social: [
      { img: 'assets/img/icon_Line.png', url: '#' },
      { img: 'assets/img/icon_Facebook.png', url: '#' },
      { img: 'assets/img/icon_Ig.png', url: '#' },
      { img: 'assets/img/icon_X.png', url: '#' }
    ]
  };
  constructor(
    private serviceProvider: ServiceProvider,
    private router: Router,
    public translate: TranslateService
  ) {
  }

  private animated = false;


  ngOnInit(): void {
    this.readAboutMe();
    AOS.init({
      duration: 800,
      once: false,
      mirror: true,
      offset: 10
    });

    setTimeout(() => {
      AOS.refresh();
    }, 100);

    // ✅ เรียกเช็ก localStorage แบบ real-time ทุก 500ms
    setInterval(() => {
      this.isShow = localStorage.getItem("isShow") ?? 'false'; // default เป็น true ถ้าไม่มีค่า
    }, 500);

    this.checkAndAnimate();

  }

  @HostListener('window:scroll')
  onScroll() {
    this.checkAndAnimate();
  }

  checkAndAnimate() {
    const footer = document.getElementById('visitorStats');
    if (!footer || this.animated) return;

    const rect = footer.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // เริ่ม animation เมื่อ footer เข้ามา 70% ของ viewport
    if (rect.top < windowHeight * 0.9) {
      this.animated = true;
      this.startAnimation();
    }
  }


  startAnimation() {
  const daily = this.randomInRange(10, 20);
  const weekly = this.randomInRange(50, 120);
  const monthly = this.randomInRange(300, 600);
  const yearly = this.randomInRange(4000, 9000);
  const total = daily + weekly + monthly + yearly;

  this.animateCounter('#daily', daily, 0);
  this.animateCounter('#weekly', weekly, 0.1);
  this.animateCounter('#monthly', monthly, 0.2);
  this.animateCounter('#yearly', yearly, 0.3);
  this.animateCounter('#total', total, 0.4);
}

animateCounter(selector: string, value: number, delay: number) {
  const obj = { val: 0 };
  gsap.to(obj, {
    val: value,
    duration: 1.5, // เร็วขึ้น
    delay,
    ease: 'power2.out',
    onUpdate: () => {
      const el = document.querySelector(selector);
      if (el) el.textContent = Math.floor(obj.val).toLocaleString();
    }
  });
}

  randomInRange(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  readAboutMe() {
    this.serviceProvider
      .post('m/aboutUs/read', {})
      .subscribe((data) => {
        let model: any = {};
        model = data;
        this.aboutMeModel = model.objectData;
      });
  }
}
