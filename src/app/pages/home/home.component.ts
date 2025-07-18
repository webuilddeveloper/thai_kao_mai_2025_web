import { Component, ElementRef, HostListener, Renderer2, ViewChild, QueryList, ViewChildren, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ServiceProvider } from 'src/app/shared/service-provider.service';
import * as AOS from 'aos';
import { Utilities } from 'src/app/shared/utilities';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {
  aboutMeModel: any = {};
  showCookieBanner = !localStorage.getItem('cookieAccepted');
  fontSizeSelect: number = 0;
  deviceSize: string = '';
  targetAmount = 100000;
  currentAmount = 0;
  targetDisplayAmount = 2234;
  percentage = 0;
  finalNumber = '2234';
  digits = Array.from(this.finalNumber);
  @ViewChildren('digitRef') digitRefs!: QueryList<ElementRef>;
  @ViewChildren('underlineRef') underlineRefs!: QueryList<ElementRef>;
  @ViewChild('observerSection') observerSection!: ElementRef;

  serviceList: any = [
    {
      title: "ติดตั้ง",
      describe: "บริการรับติดแก๊ส LNG รถบรรทุก",
      icon: "./assets/icons/icon-install.png"
    },
    {
      title: "ตรวจสภาพ",
      describe: "บริการรับตรวจเช็คสภาพ และซ่อมบำรุงระบบ",
      icon: "./assets/icons/icon-maintain.png"
    },
    {
      title: "จดทะเบียน",
      describe: "บริการแนะนำการจดทะเบียน สำหรับรถใช้ก๊าช LNG",
      icon: "./assets/icons/icon-recomance.png"
    },
    {
      title: "จัดจำหน่าย",
      describe: "บริการจัดจำหน่ายชุดอุปกรณ์ถังก๊าช ชิ้นส่วน และอะไหล่ต่างๆ",
      icon: "./assets/icons/icon-sale.png"
    },
    {
      title: "สินเชื่อ",
      describe: "บริการให้คำปรึกษาด้านสินเชื่อสำหรับการติดตั้งแก๊ส",
      icon: "./assets/icons/icon-credit.png"
    },
    {
      title: "อบรม",
      describe: "บริการคอร์สฝึกอบรมเกี่ยวกับ LNG",
      icon: "./assets/icons/icon-course.png"
    },
  ];

  newsList: any = [
    {
      code: "1",
      title: "Lorem ipsum dolor sit amet,consec tetur adipiscing elit,sed do eiusmod.",
      date: "9 ก.ค. 2668",
      imageUrl: "./assets/img/news_cover.webp"
    },
    {
      code: "2",
      title: "Lorem ipsum dolor sit amet,consec tetur adipiscing elit,sed do eiusmod.",
      date: "9 ก.ค. 2668",
      imageUrl: "./assets/img/news_cover.webp"
    },
    {
      code: "2",
      title: "Lorem ipsum dolor sit amet,consec tetur adipiscing elit,sed do eiusmod.",
      date: "9 ก.ค. 2668",
      imageUrl: "./assets/img/news_cover.webp"
    },
    {
      code: "2",
      title: "Lorem ipsum dolor sit amet,consec tetur adipiscing elit,sed do eiusmod.",
      date: "9 ก.ค. 2668",
      imageUrl: "./assets/img/news_cover.webp"
    },
    {
      code: "2",
      title: "Lorem ipsum dolor sit amet,consec tetur adipiscing elit,sed do eiusmod.",
      date: "9 ก.ค. 2668",
      imageUrl: "./assets/img/news_cover.webp"
    },
  ];

  policyList: any = [
    {
      code: "1",
      title: "นโยบายการศึกษาไทย",
      description: "เด็กทุกคนควรมีโอกาสเรียนรู้ ไม่ว่าจะอยู่มุมไหนของประเทศ",
      date: "9 ก.ค. 2668",
      imageUrl: "./assets/img/policy_cover1.webp"
    },
    {
      code: "2",
      title: "นโยบายการศึกษาไทย",
      description: "เด็กทุกคนควรมีโอกาสเรียนรู้ ไม่ว่าจะอยู่มุมไหนของประเทศ",
      date: "9 ก.ค. 2668",
      imageUrl: "./assets/img/policy_cover2.webp"
    },

  ];

  @ViewChild('whoWeTechMakers') whoWeTechMakers!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private serviceProvider: ServiceProvider,
    private router: Router,
    public translate: TranslateService,
    private renderer: Renderer2,
    private el: ElementRef,
    private utilities: Utilities,
  ) {


  }

  @ViewChild('animatedBox') box!: ElementRef;
  isVisible = false;

  ngAfterViewInit() {
    // const observer = new IntersectionObserver((entries) => {
    //   if (entries[0].isIntersecting) {
    //     this.isVisible = true;
    //     observer.disconnect(); // ไม่ต้องตรวจซ้ำ
    //   }
    // }, {
    //   threshold: 0.5 // เห็น 50% ถึงจะถือว่าแสดง
    // });

    // observer.observe(this.box.nativeElement);


    ScrollTrigger.create({
      trigger: this.observerSection.nativeElement,
      start: 'top 70%',
      once: true,
      onEnter: () => {
        this.readMember();
        this.donateTotal();
      }
    });

  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const triggerElement = this.el.nativeElement.querySelector('.bg');
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    if (scrollTop > 0.5) { // ✅ ย่อทันทีที่เลื่อนแม้ 1px
      this.renderer.addClass(triggerElement, 'shrink');
    } else {
      this.renderer.removeClass(triggerElement, 'shrink');
    }


  }

  ngOnInit(): void {

    this.deviceSize = localStorage.getItem('deviceSize') || '';
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

  readNews() {
    this.serviceProvider
      .post('m/news/read', {})
      .subscribe((data) => {
        let model: any = {};
        model = data;
        this.newsList = model.objectData;
      });
  }

  gotoNewsPage() {
    this.router.navigate(["performance-details"], {
      // skipLocationChange: true,
    });
  }

  scrollToSection() {
    this.whoWeTechMakers.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

  readAboutMe() {
    this.serviceProvider
      .post('aboutUs/read', {})
      .subscribe((data) => {
        let model: any = {};
        model = data;
        this.aboutMeModel = model.objectData[0];
      });
  }
  goToDetail(param: any) {
    this.router.navigate(['/policy-detail', param], {
    });
  }


  donateTotal() {
    const duration = 2000;
    const frameRate = 60;
    const totalFrames = Math.round(duration / (1000 / frameRate));
    let frame = 0;

    const amountIncrement = this.targetDisplayAmount / totalFrames;

    const animate = () => {
      frame++;
      this.currentAmount = Math.min(this.targetDisplayAmount, Math.round(amountIncrement * frame));
      this.percentage = (this.currentAmount / this.targetAmount) * 100;

      if (frame < totalFrames) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }

  readMember() {
    setTimeout(() => {

      const targetNumber = 2234;
      const digitsStr = targetNumber.toString().padStart(4, '0');
      this.digits = digitsStr.split('');

      const delayPerDigit = 0.2;
      const randomCount = 30;
      const singleDigitDuration = 0.05;

      const digitArray = this.digitRefs?.toArray().reverse();
      const underlineArray = this.underlineRefs?.toArray().reverse();

      if (!digitArray || !underlineArray || digitArray.length === 0) {
        console.error('Digit references not ready yet.');
        return;
      }


      digitArray.forEach((digitEl, i) => {
        const element = digitEl.nativeElement;
        const underline = underlineArray[i].nativeElement;

        const reversedIndex = this.digits.length - 1 - i;
        const finalValue = this.digits[reversedIndex];

        const tl = gsap.timeline({ delay: i * delayPerDigit });

        for (let j = 0; j < randomCount; j++) {
          tl.to(element, {
            text: { value: Math.floor(Math.random() * 10).toString() },
            duration: singleDigitDuration,
            ease: 'none'
          });
        }

        tl.to(element, {
          text: { value: finalValue },
          duration: 0.2,
          ease: 'power2.out',
          onComplete: () => {
            gsap.to(underline, {
              transformOrigin: 'right',
              scaleX: 1,
              duration: 0.4,
              ease: 'power2.out'
            });
          }
        });
      });
    }, 0);
  }
}

