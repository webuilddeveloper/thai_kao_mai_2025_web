import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ServiceProvider } from 'src/app/shared/service-provider.service';
import * as AOS from 'aos';

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

  ngOnInit(): void {
    // this.readAboutMe();
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
