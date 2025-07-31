import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ServiceProvider } from 'src/app/shared/service-provider.service';

@Component({
  selector: 'app-newsdetail',
  templateUrl: './newsdetail.component.html',
  styleUrls: ['./newsdetail.component.scss'],
})
export class NewsDetailComponent implements OnInit {
  code: string = '';
  newsDetail: any;
  deviceSize: string = '';

  constructor(
    private route: ActivatedRoute,
    private serviceProvider: ServiceProvider,
    public translate: TranslateService,
    private router: Router
  ) {}

  formatThaiDate(input: string): string {
    const year = +input.substring(0, 4);
    const month = +input.substring(4, 6);
    const day = +input.substring(6, 8);
    const date = new Date(year, month - 1, day);
    const thaiMonths = [
      'มกราคม',
      'กุมภาพันธ์',
      'มีนาคม',
      'เมษายน',
      'พฤษภาคม',
      'มิถุนายน',
      'กรกฎาคม',
      'สิงหาคม',
      'กันยายน',
      'ตุลาคม',
      'พฤศจิกายน',
      'ธันวาคม',
    ];
    return `${date.getDate()} ${
      thaiMonths[date.getMonth()]
    } ${date.getFullYear()}`;
  }

  goBack() {
    this.router.navigate(['/news']);
  }

  ngOnInit(): void {
    this.code = this.route.snapshot.paramMap.get('code')!;
    this.callRead();
  }

  callRead() {
    this.serviceProvider
      .post('m/news/read', { code: this.code })
      .subscribe((data) => {
        var model: any = {};
        model = data;
        this.newsDetail = model.objectData[0];
      });
  }
}
