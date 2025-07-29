import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ServiceProvider } from 'src/app/shared/service-provider.service';

@Component({
  selector: 'app-suggestion',
  templateUrl: './suggestion.component.html',
  styleUrls: ['./suggestion.component.scss'],
})
export class SuggestionComponent {
  isModalOpen = false;
  deviceSize = '';
  model: any = { category: '', email: '', description: '',status:'N' };
  modelCategory: any = [];
  constructor(
    private serviceProvider: ServiceProvider,
    public translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.callReadCategory();
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
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
    if (this.model.category == '') return;
    this.serviceProvider
      .post('suggestion/create', this.model)
      .subscribe((res) => {
        let data: any = {};
        data = res;
        this.openModal();
      });
  }
}
