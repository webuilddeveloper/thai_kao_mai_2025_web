import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ServiceProvider } from 'src/app/shared/service-provider.service';
import * as AOS from 'aos';
import { Router } from '@angular/router';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.scss']
})
export class DonateComponent {
  selectedMethod: string = 'qr'; // ตั้งค่าเริ่มต้น

  showForm: boolean = false;
  formType: string = 'person'; // ค่าเริ่มต้นคือบุคคล
  firstName: string = '';
  lastName: string = '';
  targetAmount = 1000000;
  currentAmount = 0;
  targetDisplayAmount = 435340;
  percentage = 0;
  finalNumber = '134';
  digits = Array.from(this.finalNumber);
  @ViewChildren('digitRef') digitRefs!: QueryList<ElementRef>;
  @ViewChildren('underlineRef') underlineRefs!: QueryList<ElementRef>;
  constructor(private serviceProvider: ServiceProvider, public translate: TranslateService, private router: Router,) { }

  ngOnInit(): void {
    gsap.registerPlugin(TextPlugin);

    this.readMember();
    this.donateTotal();
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

  readMember() {
    setTimeout(() => {

      const targetNumber = 134;
      const digitsStr = targetNumber.toString().padStart(3, '0');
      this.digits = digitsStr.split('');

      const delayPerDigit = 0.2;
      const randomCount = 30;
      const singleDigitDuration = 0.05;

      const digitArray = this.digitRefs?.toArray().reverse();
      const underlineArray = this.underlineRefs?.toArray().reverse();

      if (!digitArray || !underlineArray || digitArray.length === 0) {
        console.error('Digit references not ready yet.');
        return;
      }


      digitArray.forEach((digitEl, i) => {
        const element = digitEl.nativeElement;
        const underline = underlineArray[i].nativeElement;

        const reversedIndex = this.digits.length - 1 - i;
        const finalValue = this.digits[reversedIndex];

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
          duration: 0.2,
          ease: 'power2.out',
          onComplete: () => {
            gsap.to(underline, {
              transformOrigin: 'right',
              scaleX: 1,
              duration: 0.4,
              ease: 'power2.out'
            });
          }
        });
      });
    }, 0);
  }
}


