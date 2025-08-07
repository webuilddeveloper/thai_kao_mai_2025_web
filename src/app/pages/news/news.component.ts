import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ServiceProvider } from 'src/app/shared/service-provider.service';
import * as AOS from 'aos';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit {
  newsList: any[] = [];
  newsHighlight: any[] = [];
  deviceSize: string = '';

  constructor(
    private serviceProvider: ServiceProvider,
    public translate: TranslateService
  ) {}

  formatThaiDate(input: string): string {
    const year = +input.substring(0, 4);
    const month = +input.substring(4, 6);
    const day = +input.substring(6, 8);
    const date = new Date(year, month - 1, day);
    const thaiMonths = [
      'มกราคม',
      'กุมภาพันธ์',
      'มีนาคม',
      'เมษายน',
      'พฤษภาคม',
      'มิถุนายน',
      'กรกฎาคม',
      'สิงหาคม',
      'กันยายน',
      'ตุลาคม',
      'พฤศจิกายน',
      'ธันวาคม',
    ];
    return `${date.getDate()} ${
      thaiMonths[date.getMonth()]
    } ${date.getFullYear()}`;
  }

  ngOnInit(): void {
    this.serviceProvider.SendIPAddress('news');
    this.callRead();
    this.deviceSize = localStorage.getItem('deviceSize') || '';
    AOS.init({
      duration: 800,
      once: false,
      mirror: true,
      offset: 30,
    });
    setTimeout(() => {
      AOS.refresh();
    }, 100);
  }

  callRead() {
    this.serviceProvider.post('m/news/read', {}).subscribe((data) => {
      var model: any = {};
      model = data;

      this.newsHighlight = model.objectData.slice(0, 2);
      this.newsList = model.objectData.slice(2);
    });
  }
}
