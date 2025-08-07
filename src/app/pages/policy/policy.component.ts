import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import * as AOS from 'aos';
import { ServiceProvider } from 'src/app/shared/service-provider.service';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.scss'],
})
export class PolicyComponent implements OnInit {
  deviceSize: string = '';
  constructor(
    private serviceProvider: ServiceProvider,
    private router: Router,
    public translate: TranslateService
  ) {}
  model: any = [];

  ngOnInit(): void {
    this.serviceProvider.SendIPAddress('policy');
    this.callRead();
    this.deviceSize = localStorage.getItem('deviceSize') || '';
    AOS.init({
      duration: 1000,
      offset: 100,
      once: false,
      mirror: true,
    });

    setTimeout(() => {
      AOS.refresh();
    }, 100);
  }

  callRead() {
    this.serviceProvider.post('m/policyParty/read', {}).subscribe((res) => {
      let data: any = {};
      data = res;
      this.model = data.objectData;
    });
  }
}
