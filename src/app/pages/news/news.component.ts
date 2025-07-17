import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ServiceProvider } from 'src/app/shared/service-provider.service';
import * as AOS from 'aos';



@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

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

     this.newsHighlight = [
    {
      code: "1",
      imageUrl: "./assets/img/news_cover.webp",
       title: "Lorem ipsum dolor sit amet,consec tetur adipiscing elit,sed do eiusmod.",
     description: "Lorem ipsum dolor sit amet,consec tetur adipiscing elit,sed do eiusmod.",
      createDate: "2025-07-16T09:30:00Z",
      createBy: "admin"
    },
    {
      code: "2",
      imageUrl: "./assets/img/news_cover.webp",
      title: "Lorem ipsum dolor sit amet,consec tetur adipiscing elit,sed do eiusmod.",
      description: "Lorem ipsum dolor sit amet,consec tetur adipiscing elit,sed do eiusmod.",
      createDate: "2025-07-15T08:00:00Z",
      createBy: "admin"
    },
 
  ];


    this.newsList = [
    {
      code: "1",
      imageUrl: "./assets/img/policy_cover1.webp",
      title: "Lorem ipsum dolor sit amet,consec tetur adipiscing elit,sed do eiusmod.",
      titleEN: "Mock News One",
      description: "Lorem ipsum dolor sit amet,consec tetur adipiscing elit,sed do eiusmod.",
   
      createDate: "2025-07-16T09:30:00Z",
      createBy: "admin"
    },
    {
      code: "2",
      imageUrl: "./assets/img/policy_cover2.webp",
      title: "Lorem ipsum dolor sit amet,consec tetur adipiscing elit,sed do eiusmod.",
      description: "Lorem ipsum dolor sit amet,consec tetur adipiscing elit,sed do eiusmod.",
      createDate: "2025-07-15T08:00:00Z",
      createBy: "admin"
    },
    {
      code: "3",
      imageUrl: "./assets/img/policy_cover1.webp",
      title: "Lorem ipsum dolor sit amet,consec tetur adipiscing elit,sed do eiusmod.",
   
      description: "Lorem ipsum dolor sit amet,consec tetur adipiscing elit,sed do eiusmod.",

      createDate: "2025-07-14T12:45:00Z",
      createBy: "editor"
    }
  ];

 


    this.serviceProvider.post(url, body).subscribe((data) => {
      var model: any = {}
      model = data;

      // this.newsList = model.objectData 

      console.log('newsList');
      // this.newsHighlight = model.objectData;
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
