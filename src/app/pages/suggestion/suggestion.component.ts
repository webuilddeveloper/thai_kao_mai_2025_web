import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { ServiceProvider } from 'src/app/shared/service-provider.service';

@Component({
  selector: 'app-suggestion',
  templateUrl: './suggestion.component.html',
  styleUrls: ['./suggestion.component.scss'],
})
export class SuggestionComponent {
  isModalOpen = false;
  deviceSize = '';
  model: any = { category: '', email: '', description: '', status: 'N' };
  modelCategory: any = [];
  constructor(
    private serviceProvider: ServiceProvider,
    public translate: TranslateService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.deviceSize = localStorage.getItem('deviceSize') || '';
    this.callReadCategory();
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.router.navigate(['/home']);
  }

  callReadCategory() {
    this.serviceProvider
      .post('m/suggestion/category/read', {})
      .subscribe((res) => {
        let data: any = {};
        data = res;
        this.modelCategory = data.objectData;
      });
  }

  sendApi() {
    if (this.model.category == '') {
      this.toastr.warning('กรุณาเลือกคำนำหน้า', 'แจ้งเตือน');
      return;
    }
    this.serviceProvider
      .post('suggestion/create', this.model)
      .subscribe((res) => {
        let data: any = {};
        data = res;
        this.openModal();
      });
  }

  onSubmit(formRef: NgForm) {
    if (formRef.invalid) {
      // mark ทุก field เป็น touched เพื่อให้แสดง error
      Object.values(formRef.controls).forEach((control) => {
        control.markAsTouched();
      });

      return; // ไม่ให้ submit ต่อถ้า form ไม่ valid
    }

    this.sendApi();
  }
}
