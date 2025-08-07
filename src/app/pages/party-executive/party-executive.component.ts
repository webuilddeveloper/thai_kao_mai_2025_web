import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ServiceProvider } from 'src/app/shared/service-provider.service';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as AOS from 'aos';

@Component({
  selector: 'app-party-executive',
  templateUrl: './party-executive.component.html',
  styleUrls: ['./party-executive.component.scss'],
})
export class PartyExecutiveComponent {
  model: any = {};
  modelCategory: any = [];
  deviceSize: string = '';
  constructor(
    private serviceProvider: ServiceProvider,
    private router: Router,
    public translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.serviceProvider.SendIPAddress('party-executive');
    this.deviceSize = localStorage.getItem('deviceSize') || '';
    this.callReadCategory();
    this.callRead();
    AOS.init({
      duration: 800,
      once: false,
      mirror: true,
      offset: 50,
    });

    setTimeout(() => {
      AOS.refresh();
    }, 100);
  }

  callRead() {
    this.serviceProvider.post('m/partyExecutive/read', {}).subscribe((res) => {
      let data: any = {};
      data = res;
      this.model = data.objectData;
    });
  }

  callReadCategory() {
    this.serviceProvider
      .post('m/partyExecutive/category/read', {})
      .subscribe((res) => {
        let data: any = {};
        data = res;
        this.modelCategory = data.objectData;
      });
  }
}
