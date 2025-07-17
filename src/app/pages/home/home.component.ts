import { Component, ElementRef, HostListener, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ServiceProvider } from 'src/app/shared/service-provider.service';
import * as AOS from 'aos';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  aboutMeModel: any = {};
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
      title: "นโยบายคมนาคม",
      description: "คมนาคมที่ทั่วถึง คือเส้นเลือดใหญ่ของประเทศที่เติบโต",
      date: "9 ก.ค. 2668",
      imageUrl: "./assets/img/policy-mock-1.png"
    },
    {
      code: "2",
      title: "นโยบายการศึกษาไทย",
      description: "เด็กทุกคนควรมีโอกาสเรียนรู้ ไม่ว่าจะอยู่มุมไหนของประเทศ",
      date: "9 ก.ค. 2668",
      imageUrl: "./assets/img/policy-mock-2.jpg"
    },

  ];

  @ViewChild('whoWeTechMakers') whoWeTechMakers!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private serviceProvider: ServiceProvider,
    private router: Router,
    public translate: TranslateService,
    private renderer: Renderer2,
    private el: ElementRef
  ) {

  }

  @ViewChild('animatedBox') box!: ElementRef;
  isVisible = false;

  ngAfterViewInit() {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        this.isVisible = true;
        observer.disconnect(); // ไม่ต้องตรวจซ้ำ
      }
    }, {
      threshold: 0.5 // เห็น 50% ถึงจะถือว่าแสดง
    });

    observer.observe(this.box.nativeElement);
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
}
