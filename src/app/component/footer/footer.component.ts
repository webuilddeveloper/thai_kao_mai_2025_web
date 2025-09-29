import { Component, HostListener, Input, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ServiceProvider } from 'src/app/shared/service-provider.service';
import * as AOS from 'aos';
import { gsap } from 'gsap';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  isShow = 'false'; // เพิ่มตรงนี้

  aboutMeModel: any = {
    location: '8819 Ohio St. South Gate, CA 90280',
    email: 'Ourstudio@hello.com',
    tel: '+1 386-688-3295',
  };
  contact = {
    address:
      'Borem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio',
    email: 'xxxxxxxx@gmail.com',
    phone: '02–123–4567',
    social: [
      { img: 'assets/img/icon_Line.png', url: '#' },
      { img: 'assets/img/icon_Facebook.png', url: '#' },
      { img: 'assets/img/icon_Ig.png', url: '#' },
      { img: 'assets/img/icon_X.png', url: '#' },
    ],
  };

  daily: number = 0;
  weekly: number = 0;
  monthly: number = 0;
  yearly: number = 0;
  all: number = 0;
  @Input() showFooter!: boolean;
  private firstChangeDone: number = 0;

  constructor(
    private serviceProvider: ServiceProvider,
    private router: Router,
    public translate: TranslateService
  ) {

  }

  private animated = false;

  ngOnInit() {
    this.readAboutMe();
    this.readCountIP();
    this.readView();
    AOS.init({
      duration: 800,
      once: false,
      mirror: true,
      offset: 10,
    });

    setTimeout(() => {
      AOS.refresh();
    }, 100);

    // ✅ เรียกเช็ก localStorage แบบ real-time ทุก 500ms
    setInterval(() => {
      this.isShow = localStorage.getItem('isShow') ?? 'false'; // default เป็น true ถ้าไม่มีค่า
    }, 500);

    // setInterval(() => {
    //   this.readCountIP();
    //   if (this.daily != Number(localStorage.getItem("daily") ?? 0)) {
    //     this.readView()
    //     this.startAnimation();
    //   }
    // }, 5000);

    this.checkAndAnimate();
  }

  readView() {
    this.daily = Number(localStorage.getItem("daily") ?? 0)
    this.weekly = Number(localStorage.getItem("weekly") ?? 0)
    this.monthly = Number(localStorage.getItem("monthly") ?? 0)
    this.yearly = Number(localStorage.getItem("yearly") ?? 0)
    this.all = Number(localStorage.getItem("all") ?? 0)
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
    this.animateCounter('#daily', this.daily, 0);
    this.animateCounter('#weekly', this.weekly, 0.1);
    this.animateCounter('#monthly', this.monthly, 0.2);
    this.animateCounter('#yearly', this.yearly, 0.3);
    this.animateCounter('#all', this.all, 0.4);
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
      },
    });
  }

  randomInRange(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  readAboutMe() {
    this.serviceProvider.post('m/aboutUs/read', {}).subscribe((data) => {
      let model: any = {};
      model = data;
      this.aboutMeModel = model.objectData;
    });
  }

  readCountIP() {
    this.serviceProvider.get('ip/readCount').subscribe((data) => {
      let model: any = {};
      model = data;
      // localStorage.setItem("daily", model?.objectData?.countDay ?? "0")
      // localStorage.setItem("weekly", model?.objectData?.countWeek ?? "0")
      // localStorage.setItem("monthly", model?.objectData?.countMonth ?? "0")
      // localStorage.setItem("yearly", model?.objectData?.countYear ?? "0")
      // localStorage.setItem("all", model?.objectData?.countAll ?? "0")
      this.daily = model?.objectData?.countDay ?? 0;
      this.weekly = model?.objectData?.countWeek ?? 0;
      this.monthly = model?.objectData?.countMonth ?? 0;
      this.yearly = model?.objectData?.countYear ?? 0;
      this.all = model?.objectData?.countAll ?? 0;
    });
  }

  socialClick(link: string) {
    (link ?? '') != '' ? window.open(link, '_blank', 'noopener,noreferrer') : null;
  }


}
