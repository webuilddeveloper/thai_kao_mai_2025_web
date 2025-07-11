import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ServiceProvider } from 'src/app/shared/service-provider.service';

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
      icon: "./../../../assets/icons/icon-install.png"
    },
    {
      title: "ตรวจสภาพ",
      describe: "บริการรับตรวจเช็คสภาพ และซ่อมบำรุงระบบ",
      icon: "./../../../assets/icons/icon-maintain.png"
    },
    {
      title: "จดทะเบียน",
      describe: "บริการแนะนำการจดทะเบียน สำหรับรถใช้ก๊าช LNG",
      icon: "./../../../assets/icons/icon-recomance.png"
    },
    {
      title: "จัดจำหน่าย",
      describe: "บริการจัดจำหน่ายชุดอุปกรณ์ถังก๊าช ชิ้นส่วน และอะไหล่ต่างๆ",
      icon: "./../../../assets/icons/icon-sale.png"
    },
    {
      title: "สินเชื่อ",
      describe: "บริการให้คำปรึกษาด้านสินเชื่อสำหรับการติดตั้งแก๊ส",
      icon: "./../../../assets/icons/icon-credit.png"
    },
    {
      title: "อบรม",
      describe: "บริการคอร์สฝึกอบรมเกี่ยวกับ LNG",
      icon: "./../../../assets/icons/icon-course.png"
    },
  ];

  newsList: any = [
    {
      code: "1",
      title: "ข่าวสาร1;lsjflbjq';erlkgmbwnlfnbvlsjnopwrjkgl;rnlkbnmlrf;mbl;rejopnjwr",
      describe: "รายละเอียดข่าวรายละเอียดข่าวรายละเอียดข่าวรายละเอียดข่าวรายละเอียดข่าว",
      imageUrl: "./../../../assets/img/div-service-bg.png"
    },
    {
      code: "2",
      title: "ข่าวสาร2",
      describe: "รายละเอียดข่าวรายละเอียดข่าวรายละเอียดข่าวรายละเอียดข่าวรายละเอียดข่าว",
      imageUrl: "./../../../assets/img/logoMain.png"
    },
    // {
    //   code: "3",
    //   title: "ข่าวสาร3",
    //   describe: "รายละเอียดข่าวรายละเอียดข่าวรายละเอียดข่าวรายละเอียดข่าวรายละเอียดข่าว",
    //   imageUrl: "./../../../assets/img/logoMain.png"
    // },
    // {
    //   code: "4",
    //   title: "ข่าวสาร4",
    //   describe: "รายละเอียดข่าวรายละเอียดข่าวรายละเอียดข่าวรายละเอียดข่าวรายละเอียดข่าว",
    //   imageUrl: "./../../../assets/img/logoMain.png"
    // },
    // {
    //   code: "5",
    //   title: "ข่าวสาร5",
    //   describe: "รายละเอียดข่าวรายละเอียดข่าวรายละเอียดข่าวรายละเอียดข่าวรายละเอียดข่าว",
    //   imageUrl: "./../../../assets/img/logoMain.png"
    // },
  ];

  @ViewChild('whoWeTechMakers') whoWeTechMakers!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private serviceProvider: ServiceProvider,
    private router: Router,
    public translate: TranslateService
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

  ngOnInit(): void {
    this.readNews();
    this.readAboutMe();
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
}
