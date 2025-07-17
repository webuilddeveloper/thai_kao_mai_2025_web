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
}
