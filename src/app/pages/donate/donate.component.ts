import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ServiceProvider } from 'src/app/shared/service-provider.service';
import * as AOS from 'aos';
import { Router } from '@angular/router';

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
  targetDisplayAmount = 300000; 
  percentage = 0;
  constructor(private serviceProvider: ServiceProvider, public translate: TranslateService, private router: Router,) { }

  ngOnInit(): void {
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
}

