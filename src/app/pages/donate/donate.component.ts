import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ServiceProvider } from 'src/app/shared/service-provider.service';
import * as AOS from 'aos';

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.scss']
})
export class DonateComponent {
newsList: any[] = [];
  newsHighlight: any[] = [];

  constructor(private serviceProvider: ServiceProvider, public translate: TranslateService) { }


  ngOnInit(): void {

    AOS.init({
      duration: 800,
      once: false,
      mirror: true,
      offset: 30
    });

    setTimeout(() => {
      AOS.refresh(); 
    }, 100);

    const url = 'm/news/read';

    const body = {
      skip: 0,
      limit: 5,
      permission: "20250617105043-193-133",
      keySearch: "",
      center: null,
      imageUrlCreateBy: "https://khubdeedlt.we-builds.com/khubdeedlt-document/images/personal/personal_250438651.png",
      updateBy: "admincms",
      lv0: "",
      lv1: "",
      lv2: "",
      lv3: "",
      lv4: "",
      organization: [
        {
          title: "super admin",
          lv0: "",
          lv1: "",
          lv2: "",
          lv3: "",
          lv4: "",
          lv5: "",
          status: "A"
        }
      ]
    };

    this.serviceProvider.post(url, body).subscribe((data) => {
      var model: any = {}
      model = data;
      this.newsList = model.objectData
      this.newsHighlight = model.objectData;
    });
  }

  formatThaiDate(input: string): string {
    const year = +input.substring(0, 4);
    const month = +input.substring(4, 6);
    const day = +input.substring(6, 8);
    const date = new Date(year, month - 1, day);
    const thaiMonths = [
      "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
      "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
    ];
    return `${date.getDate()} ${thaiMonths[date.getMonth()]} ${date.getFullYear()}`;
  }
}
