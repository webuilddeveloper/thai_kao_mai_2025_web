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
  newsListTemp = [
    {
      code: '1',
      title:
        'Lorem ipsum dolor sit amet,consec tetur adipiscing elit,sed do eiusmod.',
      date: '9 ก.ค. 2668',
      imageUrl:
        'https://gateway.we-builds.com/tkm/assets/img/news_cover.webp',
      imageBanner:
        'https://gateway.we-builds.com/tkm/assets/img/news_cover.webp',
      description:
        '<p>Lorem ipsum dolor sit amet,consec tetur adipiscing elit,sed do eiusmod.Lorem ipsum dolor sit amet,consec tetur adipiscing elit,sed do eiusmod.Lorem ipsum dolor sit amet,consec tetur adipiscing elit,sed do eiusmod.Lorem ipsum dolor sit amet,consec tetur adipiscing elit,sed do eiusmod.Lorem ipsum dolor sit amet,consec tetur adipiscing elit,sed do eiusmod.Lorem ipsum dolor sit amet,consec tetur adipiscing elit,sed do eiusmod.Lorem ipsum dolor sit amet,consec tetur adipiscing elit,sed do eiusmod.</p>',
      createBy: 'editor1',
      createDate: '20250702101500',
    },
    {
      code: '2',
      title:
        'Lorem ipsum dolor sit amet,consec tetur adipiscing elit,sed do eiusmod.',
      date: '9 ก.ค. 2668',
      imageUrl:
        'https://gateway.we-builds.com/tkm/assets/img/news_cover.webp',
      imageBanner:
        'https://gateway.we-builds.com/tkm/assets/img/news_cover.webp',
      description:
        '<p>Lorem ipsum dolor sit amet,consec tetur adipiscing elit,sed do eiusmod.Lorem ipsum dolor sit amet,consec tetur adipiscing elit,sed do eiusmod.Lorem ipsum dolor sit amet,consec tetur adipiscing elit,sed do eiusmod.Lorem ipsum dolor sit amet,consec tetur adipiscing elit,sed do eiusmod.Lorem ipsum dolor sit amet,consec tetur adipiscing elit,sed do eiusmod.Lorem ipsum dolor sit amet,consec tetur adipiscing elit,sed do eiusmod.Lorem ipsum dolor sit amet,consec tetur adipiscing elit,sed do eiusmod.</p>',
      createBy: 'editor1',
      createDate: '20250702101500',
    },
    {
      code: '2',
      title:
        'Lorem ipsum dolor sit amet,consec tetur adipiscing elit,sed do eiusmod.',
      date: '9 ก.ค. 2668',
      imageUrl:
        'https://gateway.we-builds.com/tkm/assets/img/news_cover.webp',
      imageBanner:
        'https://gateway.we-builds.com/tkm/assets/img/news_cover.webp',
      description:
        '<p>Lorem ipsum dolor sit amet,consec tetur adipiscing elit,sed do eiusmod.Lorem ipsum dolor sit amet,consec tetur adipiscing elit,sed do eiusmod.Lorem ipsum dolor sit amet,consec tetur adipiscing elit,sed do eiusmod.Lorem ipsum dolor sit amet,consec tetur adipiscing elit,sed do eiusmod.Lorem ipsum dolor sit amet,consec tetur adipiscing elit,sed do eiusmod.Lorem ipsum dolor sit amet,consec tetur adipiscing elit,sed do eiusmod.Lorem ipsum dolor sit amet,consec tetur adipiscing elit,sed do eiusmod.</p>',
      createBy: 'editor1',
      createDate: '20250702101500',
    },
    {
      code: '2',
      title:
        'Lorem ipsum dolor sit amet,consec tetur adipiscing elit,sed do eiusmod.',
      date: '9 ก.ค. 2668',
      imageUrl:
        'https://gateway.we-builds.com/tkm/assets/img/news_cover.webp',
      imageBanner:
        'https://gateway.we-builds.com/tkm/assets/img/news_cover.webp',
      description:
        '<p>Lorem ipsum dolor sit amet,consec tetur adipiscing elit,sed do eiusmod.Lorem ipsum dolor sit amet,consec tetur adipiscing elit,sed do eiusmod.Lorem ipsum dolor sit amet,consec tetur adipiscing elit,sed do eiusmod.Lorem ipsum dolor sit amet,consec tetur adipiscing elit,sed do eiusmod.Lorem ipsum dolor sit amet,consec tetur adipiscing elit,sed do eiusmod.Lorem ipsum dolor sit amet,consec tetur adipiscing elit,sed do eiusmod.Lorem ipsum dolor sit amet,consec tetur adipiscing elit,sed do eiusmod.</p>',
      createBy: 'editor1',
      createDate: '20250702101500',
    },
    {
      code: '2',
      title:
        'Lorem ipsum dolor sit amet,consec tetur adipiscing elit,sed do eiusmod.',
      date: '9 ก.ค. 2668',
      imageUrl:
        'https://gateway.we-builds.com/tkm/assets/img/news_cover.webp',
      imageBanner:
        'https://gateway.we-builds.com/tkm/assets/img/news_cover.webp',
      description:
        '<p>Lorem ipsum dolor sit amet,consec tetur adipiscing elit,sed do eiusmod.Lorem ipsum dolor sit amet,consec tetur adipiscing elit,sed do eiusmod.Lorem ipsum dolor sit amet,consec tetur adipiscing elit,sed do eiusmod.Lorem ipsum dolor sit amet,consec tetur adipiscing elit,sed do eiusmod.Lorem ipsum dolor sit amet,consec tetur adipiscing elit,sed do eiusmod.Lorem ipsum dolor sit amet,consec tetur adipiscing elit,sed do eiusmod.Lorem ipsum dolor sit amet,consec tetur adipiscing elit,sed do eiusmod.</p>',
      createBy: 'editor1',
      createDate: '20250702101500',
    },
  ];

  constructor(
    private route: ActivatedRoute,
    private serviceProvider: ServiceProvider,
    public translate: TranslateService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.code = this.route.snapshot.paramMap.get('code')!;
    console.log('code ที่ได้รับ:', this.code);

    this.newsDetail = this.newsListTemp.find((f) => f.code == this.code);
    if (this.newsDetail) return;

    const url = '/m/news/read';
    const body = { code: this.code };

    this.serviceProvider.post(url, body).subscribe((res: any) => {
      this.newsDetail = res.objectData[0];

      console.log('News detail:', this.newsDetail);
    });
  }

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
}
