import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as AOS from 'aos';
import { ServiceProvider } from 'src/app/shared/service-provider.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
  constructor(
    private serviceProvider: ServiceProvider,
    public translate: TranslateService
  ) {}
  deviceSize: string = '';
  aboutMeModel: any = {};

  model: any = {};

  ngOnInit(): void {
    this.serviceProvider.SendIPAddress('history');
    this.deviceSize = localStorage.getItem('deviceSize') || '';
    this.callRead();
    AOS.init({
      duration: 1000,
      offset: 20,
      once: false,
      mirror: true,
    });

    setTimeout(() => {
      AOS.refresh();
    }, 100);
    this.readAboutMe();
  }

  readAboutMe() {
    this.serviceProvider.post('aboutUs/read', {}).subscribe((data) => {
      let model: any = {};
      model = data;
      this.aboutMeModel = model.objectData[0];
    });
  }

  callRead() {
    this.serviceProvider.post('m/aboutUs/read', {}).subscribe((res) => {
      let data: any = {};
      data = res;
      this.model = data.objectData;
    });
  }
}
