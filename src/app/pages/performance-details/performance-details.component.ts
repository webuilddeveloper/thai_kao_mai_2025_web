import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ServiceProvider } from 'src/app/shared/service-provider.service';

@Component({
  selector: 'app-performance-details',
  templateUrl: './performance-details.component.html',
  styleUrls: ['./performance-details.component.scss']
})
export class PerformanceDetailsComponent {
  model: any = {};
  code: string = "";
  JSON: any;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private serviceProvider: ServiceProvider,
    public translate: TranslateService) {

  }
  ngOnInit(): void {
    let data: any = this.activatedRoute.snapshot.params;
    this.code = data.code;
    this.readPerformance(this.code)
    console.log(this.code);

  }

  readPerformance(code: any) {
    this.serviceProvider
      .post('m/portfolio/read', { code: code })
      .subscribe((data) => {
        let model: any = {};
        model = data;
        this.model = model.objectData[0];
        this.model.newFunctionList = JSON.parse(this.model.functionList);

        this.serviceProvider
          .post('m/portfolio/gallery/read', { code: this.model.code })
          .subscribe((data) => {
            let model: any = {};
            model = data;
            this.model.image = model.objectData
          });
      });
  }
}
