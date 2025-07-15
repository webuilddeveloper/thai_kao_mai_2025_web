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
  styleUrls: ['./party-executive.component.scss']
})
export class PartyExecutiveComponent {

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
      lastName: 'BBB1',
      position: 'รองหัวหน้าพรรค'
    },
    {
      image: './assets/img/party_leader.png',
      firstName: 'BBB',
      lastName: 'BBB1',
      position: 'รองหัวหน้าพรรค'
    },
    {
      image: './assets/img/party_leader.png',
      firstName: 'BBB',
      lastName: 'BBB1',
      position: 'รองหัวหน้าพรรค'
    }
  ];


  ngOnInit(): void {
    AOS.init({
      duration: 800,       // ความเร็ว animation
      once: false,         // ❌ false = ให้เล่นซ้ำได้ ไม่ใช่ครั้งเดียว
      mirror: true,        // ✅ true = เล่นย้อนกลับตอน scroll ขึ้น
      offset: 10           // เริ่ม animation เมื่อเข้า viewport 10px
    });

    setTimeout(() => {
      AOS.refresh(); // สำคัญมากหลัง *ngFor หรือโหลดข้อมูล async
    }, 100);
  }

}
