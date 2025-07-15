import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ServiceProvider } from 'src/app/shared/service-provider.service';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-ideology',
  templateUrl: './ideology.component.html',
  styleUrls: ['./ideology.component.scss']
})
export class IdeologyComponent {

  aboutMeModel: any = {};
  constructor(
    private serviceProvider: ServiceProvider,
    private router: Router,
    public translate: TranslateService
  ) {

  }

 deputyLeaders = [
  {
    image: './assets/img/party_leader.png',
    firstName: 'BBB',
    lastName : 'BBB1',
    position: 'รองหัวหน้าพรรค'
  },
  {
    image: './assets/img/party_leader.png',
     firstName: 'BBB',
    lastName : 'BBB1',
    position: 'รองหัวหน้าพรรค'
  },
  {
    image: './assets/img/party_leader.png',
     firstName: 'BBB',
    lastName : 'BBB1',
    position: 'รองหัวหน้าพรรค'
  }
];


  ngOnInit(): void {

  }

}
