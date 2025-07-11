import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ServiceProvider } from 'src/app/shared/service-provider.service';

@Component({
  selector: 'app-product-and-service',
  templateUrl: './product-and-service.component.html',
  styleUrls: ['./product-and-service.component.scss']
})
export class ProductAndServiceComponent {

  isEquipmentSelect: string = "";
  modelEquipment: any = {};
  constructor(private router: Router, private serviceProvider: ServiceProvider, public translate: TranslateService) {}
  performanceList: any = [];
  equipmentList: any = [

  ];

  ngOnInit(): void {
    this.productRead();
    this.portfolioRead();
  }

  gotoDetails(param: any): void {
    this.router.navigate(["product-and-service-details", param], {
      // skipLocationChange: true,
    });
  }

  portfolioRead() {
    this.serviceProvider
      .post('m/portfolio/read', { limit: 999 })
      .subscribe((data) => {
        let model: any = {};
        model = data;
        this.performanceList = model.objectData;
      });
  }

  productRead() {
    this.serviceProvider
      .post('m/product/read', { limit: 999 })
      .subscribe((data) => {
        let model: any = {};
        model = data;
        this.isEquipmentSelect = model.objectData[0].code;
        this.modelEquipment = model.objectData.find((x: any) => x.code == this.isEquipmentSelect);
        this.equipmentList = model.objectData;
      });
  }

  gotoPerformanceDetails(param: String): void {
    this.router.navigate(["performance-details", param], {
      // skipLocationChange: true,
    });
  }

  viewDetail(param: any) {

    this.modelEquipment = param;
    this.isEquipmentSelect = param.code;
  }

  viewDetailMobile(param: any) {
    this.modelEquipment = this.equipmentList.find((x: any) => x.code == param);
    this.isEquipmentSelect = param;
  }
}
