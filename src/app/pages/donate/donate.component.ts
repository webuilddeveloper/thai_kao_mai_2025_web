import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ServiceProvider } from 'src/app/shared/service-provider.service';
import * as AOS from 'aos';

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.scss']
})
export class DonateComponent {
  selectedMethod: string = 'qr'; // ตั้งค่าเริ่มต้น

  showForm: boolean = false;
  formType: string = 'person'; // ค่าเริ่มต้นคือบุคคล

  constructor(private serviceProvider: ServiceProvider, public translate: TranslateService) { }

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
}
