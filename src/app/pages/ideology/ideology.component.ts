import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as AOS from 'aos';
import { ServiceProvider } from 'src/app/shared/service-provider.service';

@Component({
  selector: 'app-ideology',
  templateUrl: './ideology.component.html',
  styleUrls: ['./ideology.component.scss'],
})
export class IdeologyComponent implements OnInit {
  constructor(
    private serviceProvider: ServiceProvider,
    public translate: TranslateService
  ) {}

  model: any = {};
  // model = {
  //   ideologyDes: '',
  //   ideologyDesEN: '',
  //   ideologyList: [{ title: '', description: '', descriptionEN: '' }],
  // };

  ngOnInit(): void {
    this.callRead();
    AOS.init({
      duration: 1000,
      offset: 50,
      once: false,
      mirror: true,
    });

    setTimeout(() => {
      AOS.refresh();
    }, 100);
  }

  callRead() {
    this.serviceProvider.post('m/aboutUs/read', {}).subscribe((res) => {
      let data: any = {};
      data = res;
      this.model = data.objectData;
    });
  }
}
