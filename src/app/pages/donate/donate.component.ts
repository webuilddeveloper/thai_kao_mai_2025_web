import { AfterViewInit, Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ServiceProvider } from 'src/app/shared/service-provider.service';
import * as AOS from 'aos';
import { Router } from '@angular/router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.scss']
})
export class DonateComponent implements AfterViewInit {
  selectedMethod: string = 'qr'; // ตั้งค่าเริ่มต้น

  showForm: boolean = false;
  formType: string = 'person'; // ค่าเริ่มต้นคือบุคคล
  firstName: string = '';
  lastName: string = '';
  @ViewChild('numberEl', { static: true }) numberEl!: ElementRef;
  @ViewChild('observerSection') observerSection!: ElementRef;

  targetAmount = 1000000;
  currentAmount = 0;
  targetDisplayAmount = 234500;
  percentage = 0;
  targetNumber = 234500;
  digits: string[] = [];
  deviceSize: string = '';
  @ViewChildren('digitRef') digitRefs!: QueryList<ElementRef>;
  constructor(private serviceProvider: ServiceProvider, public translate: TranslateService, private router: Router,) { }

  ngAfterViewInit(): void {
    const digitsStr = this.targetNumber.toString().padStart(6, '0');
    this.digits = digitsStr.split('');

     ScrollTrigger.create({
      trigger: this.observerSection.nativeElement,
      start: 'top 70%',
      once: true,
      onEnter: () => {
        this.animateDigits();
        this.donateTotal();
      }
    });

    // setTimeout(() => this.animateDigits(), 0);

  }


  ngOnInit(): void {
    this.deviceSize = localStorage.getItem('deviceSize') || '';
    AOS.init({
      duration: 800,
      once: false,
      mirror: true,
      offset: 30
    });

    setTimeout(() => {
      AOS.refresh();
    }, 100);
  }

  selectMethod(method: string) {
    this.selectedMethod = method;
  }


  presetAmounts: number[] = [2000, 1000, 500];
  selectedAmount: number | null = 1000; // ค่าเริ่มต้น
  customAmount: number | null = null;

  selectAmount(amount: number | null) {
    this.selectedAmount = amount;
    if (amount !== null) {
      this.customAmount = null;
    }
  }

  step: number = 1;

  goToStep(stepNumber: number) {
    this.step = stepNumber;
  }

  phone: string = '';
  email: string = '';


  qrImageUrl: string = './assets/img/QR2.png'; // เปลี่ยนเป็น dynamic URL ได้ในอนาคต

  completeDonation() {
    this.goToStep(4); // ไป step 4 แสดงหน้าขอบคุณ
  }

  backToMain() {
    this.router.navigate(['/home']);
  }



  animateDigits(): void {
    const digitArray = this.digitRefs.toArray();
    const delayPerDigit = 0.2;
    const randomCount = 20;
    const singleDigitDuration = 0.04;

    digitArray.forEach((digitEl, i) => {
      const element = digitEl.nativeElement;
      const finalValue = this.digits[i];

      const tl = gsap.timeline({ delay: i * delayPerDigit });

      for (let j = 0; j < randomCount; j++) {
        tl.to(element, {
          text: { value: Math.floor(Math.random() * 10).toString() },
          duration: singleDigitDuration,
          ease: 'none'
        });
      }

      tl.to(element, {
        text: { value: finalValue },
        duration: singleDigitDuration,
        ease: 'power1.out'
      });
    });
  }

  donateTotal() {
    const duration = 2000;
    const frameRate = 60;
    const totalFrames = Math.round(duration / (1000 / frameRate));
    let frame = 0;

    const amountIncrement = this.targetDisplayAmount / totalFrames;

    const animate = () => {
      frame++;
      this.currentAmount = Math.min(this.targetDisplayAmount, Math.round(amountIncrement * frame));
      this.percentage = (this.currentAmount / this.targetAmount) * 100;

      if (frame < totalFrames) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }
}


