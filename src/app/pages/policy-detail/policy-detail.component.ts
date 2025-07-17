import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ServiceProvider } from 'src/app/shared/service-provider.service';

@Component({
  selector: 'app-policy-detail',
  templateUrl: './policy-detail.component.html',
  styleUrls: ['./policy-detail.component.scss']
})
export class PolicyDetailComponent implements OnInit {
  code: string = '';
  newsDetail: any;

  constructor(
    private serviceProvider: ServiceProvider,
    public translate: TranslateService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  policy: any;
  policies = [
    {
      code: '1',
      imageUrl: './assets/img/pic_policy1.png',
      title: 'นโยบายคมนาคม',
      description: 'คมนาคมที่ทั่วถึง คือเส้นเลือดใหญ่ของประเทศที่เติบโต'
    },
    {
      code: '2',
      imageUrl: './assets/img/pic_policy2.png',
      title: 'นโยบายการศึกษาไทย',
      description: 'เด็กทุกคนควรมีโอกาสเรียนรู้ ไม่ว่าจะอยู่มุมไหนของประเทศ'
    }

  ];

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.policy = this.activatedRoute.snapshot.params;
    });


    // this.read();
  }

  goBack() {
    this.router.navigate(['/policy']);
  }


  // read() {
  //   this.policy = this.policies.find(c => c.code === this.code);
  // }

  formatThaiDate(input: string): string {
    const year = +input.substring(0, 4);
    const month = +input.substring(4, 6);
    const day = +input.substring(6, 8);
    const date = new Date(year, month - 1, day);
    const thaiMonths = [
      "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
      "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
    ];
    return `${date.getDate()} ${thaiMonths[date.getMonth()]} ${date.getFullYear()}`;
  }
}
