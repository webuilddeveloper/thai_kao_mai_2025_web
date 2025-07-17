import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ServiceProvider } from 'src/app/shared/service-provider.service';

@Component({
  selector: 'app-register-member',
  templateUrl: './register-member.component.html',
  styleUrls: ['./register-member.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RegisterMemberComponent implements OnInit {
  isModalOpen = false;
  constructor(
    private serviceProvider: ServiceProvider,
    public translate: TranslateService
  ) {}

  ngOnInit(): void {

  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

}
