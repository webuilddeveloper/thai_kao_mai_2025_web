import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ServiceProvider } from 'src/app/shared/service-provider.service';

@Component({
  selector: 'app-newsdetail',
  templateUrl: './newsdetail.component.html',
  styleUrls: ['./newsdetail.component.scss']
})
export class NewsDetailComponent implements OnInit {
  code: string = '';
  newsDetail: any;

  constructor(
    private route: ActivatedRoute,
    private serviceProvider: ServiceProvider,
    public translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.code = this.route.snapshot.paramMap.get('code')!;
      console.log('code ที่ได้รับ:', this.code);

    const url = '/m/news/read';
    const body = { code: this.code };

    this.serviceProvider.post(url, body).subscribe((res: any) => {
      this.newsDetail = res.objectData[0];
   ;
      console.log('News detail:', this.newsDetail);

    });
  }
}
