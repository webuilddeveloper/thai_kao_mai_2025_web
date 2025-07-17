import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ServiceProvider } from 'src/app/shared/service-provider.service';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as AOS from 'aos';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {

  aboutMeModel: any = {};
  constructor(
    private serviceProvider: ServiceProvider,
    private router: Router,
    public translate: TranslateService
  ) {

  }
  @ViewChild('contactBox') contactBox!: ElementRef;
  @ViewChild('linesContainer') linesContainer!: ElementRef; animation: any;


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

  donationAmount = 45760741; // ตัวเลขยอดบริจาค


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


    this.readAboutMe();
    gsap.registerPlugin(ScrollTrigger);
    if (this.animation) this.animation.revert();

    gsap.to(this.contactBox.nativeElement, {
      y: -80,              // ขยับกล่องขึ้นมากขึ้น (เดิม -40)
      ease: 'sine.out',
      scrollTrigger: {
        trigger: this.contactBox.nativeElement,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.8,        // delay, smooth ตาม scroll มากขึ้น (เดิม 0.8)
      },
    });
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
