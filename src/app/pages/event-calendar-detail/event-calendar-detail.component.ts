import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ServiceProvider } from 'src/app/shared/service-provider.service';

@Component({
  selector: 'app-event-calendar-detail',
  templateUrl: './event-calendar-detail.component.html',
  styleUrls: ['./event-calendar-detail.component.scss'],
})
export class EventCalendarDetailComponent implements OnInit {
  code: string = '';
  newsDetail: any;

  modelDataList: any[] = [
    {
      code: '20250702101500-001-001',
      title:
        'Lorem ipsum dolor sit amet,consec tetur adipiscing elit,sed do eiusmod.',
      titleEN: '',
      imageUrl:
        'https://lc.we-builds.com/wb-document/images/banner/banner_251834322.png',
      imageBanner:
        'https://lc.we-builds.com/wb-document/images/banner/banner_251834322.png',
      productCode: '',
      sequence: 1,
      category: 'politics',
      description:
        '<p>Lorem ipsum dolor sit amet,consec tetur adipiscing elit,sed do eiusmod.Lorem ipsum dolor sit amet,consec tetur adipiscing elit,sed do eiusmod.Lorem ipsum dolor sit amet,consec tetur adipiscing elit,sed do eiusmod.Lorem ipsum dolor sit amet,consec tetur adipiscing elit,sed do eiusmod.Lorem ipsum dolor sit amet,consec tetur adipiscing elit,sed do eiusmod.Lorem ipsum dolor sit amet,consec tetur adipiscing elit,sed do eiusmod.Lorem ipsum dolor sit amet,consec tetur adipiscing elit,sed do eiusmod.</p>',
      descriptionEN: '',
      createBy: 'editor1',
      createDate: '20250702101500',
      createTime: '10:15:00',
      updateBy: 'editor1',
      updateDate: '20250702120000',
      updateTime: '12:00:00',
      isActive: true,
      status: 'A',
      docDate: '2025-07-02T07:00:00+07:00',
      docTime: '10:15:00',
    },
    {
      code: '20250705113000-002-002',
      title: 'เพื่อไทยเปิดตัวทีมเศรษฐกิจใหม่ เสริมความเชื่อมั่นนักลงทุน',
      titleEN: '',
      imageUrl:
        'https://lc.we-builds.com/wb-document/images/banner/banner_251834322.png',
      imageBanner:
        'https://lc.we-builds.com/wb-document/images/banner/banner_251834322.png',
      productCode: '',
      sequence: 2,
      category: 'politics',
      description:
        '<p>Lorem ipsum dolor sit amet,consec tetur adipiscing elit,sed do eiusmod.Lorem ipsum dolor sit amet,consec tetur adipiscing elit,sed do eiusmod.Lorem ipsum dolor sit amet,consec tetur adipiscing elit,sed do eiusmod.Lorem ipsum dolor sit amet,consec tetur adipiscing elit,sed do eiusmod.Lorem ipsum dolor sit amet,consec tetur adipiscing elit,sed do eiusmod.Lorem ipsum dolor sit amet,consec tetur adipiscing elit,sed do eiusmod.Lorem ipsum dolor sit amet,consec tetur adipiscing elit,sed do eiusmod.</p>',
      descriptionEN: '',
      createBy: 'editor2',
      createDate: '20250705113000',
      createTime: '11:30:00',
      updateBy: 'editor2',
      updateDate: '20250705150000',
      updateTime: '15:00:00',
      isActive: true,
      status: 'A',
      docDate: '2025-07-05T07:00:00+07:00',
      docTime: '11:30:00',
    },
    {
      code: '20250708140000-003-003',
      title:
        'Lorem ipsum dolor sit amet,consec tetur adipiscing elit,sed do eiusmod.',
      titleEN: '',
      imageUrl:
        'https://lc.we-builds.com/wb-document/images/banner/banner_251834322.png',
      imageBanner:
        'https://lc.we-builds.com/wb-document/images/banner/banner_251834322.png',
      productCode: '',
      sequence: 3,
      category: 'politics',
      description:
        '<p>Lorem ipsum dolor sit amet,consec tetur adipiscing elit,sed do eiusmod.Lorem ipsum dolor sit amet,consec tetur adipiscing elit,sed do eiusmod.Lorem ipsum dolor sit amet,consec tetur adipiscing elit,sed do eiusmod.Lorem ipsum dolor sit amet,consec tetur adipiscing elit,sed do eiusmod.Lorem ipsum dolor sit amet,consec tetur adipiscing elit,sed do eiusmod.Lorem ipsum dolor sit amet,consec tetur adipiscing elit,sed do eiusmod.Lorem ipsum dolor sit amet,consec tetur adipiscing elit,sed do eiusmod.</p>',
      descriptionEN: '',
      createBy: 'editor3',
      createDate: '20250708140000',
      createTime: '14:00:00',
      updateBy: 'editor3',
      updateDate: '20250708170000',
      updateTime: '17:00:00',
      isActive: true,
      status: 'A',
      docDate: '2025-07-18T07:00:00+07:00',
      docTime: '14:00:00',
    },
    {
      code: '20250710121500-004-004',
      title:
        'Lorem ipsum dolor sit amet,consec tetur adipiscing elit,sed do eiusmod.',
      titleEN: '',
      imageUrl:
        'https://lc.we-builds.com/wb-document/images/banner/banner_251834322.png',
      imageBanner:
        'https://lc.we-builds.com/wb-document/images/banner/banner_251834322.png',
      productCode: '',
      sequence: 4,
      category: 'politics',
      description:
        '<p>Lorem ipsum dolor sit amet,consec tetur adipiscing elit,sed do eiusmod.Lorem ipsum dolor sit amet,consec tetur adipiscing elit,sed do eiusmod.Lorem ipsum dolor sit amet,consec tetur adipiscing elit,sed do eiusmod.Lorem ipsum dolor sit amet,consec tetur adipiscing elit,sed do eiusmod.Lorem ipsum dolor sit amet,consec tetur adipiscing elit,sed do eiusmod.Lorem ipsum dolor sit amet,consec tetur adipiscing elit,sed do eiusmod.Lorem ipsum dolor sit amet,consec tetur adipiscing elit,sed do eiusmod.</p>',
      descriptionEN: '',
      createBy: 'editor4',
      createDate: '20250710121500',
      createTime: '12:15:00',
      updateBy: 'editor4',
      updateDate: '20250710150000',
      updateTime: '15:00:00',
      isActive: true,
      status: 'A',
      docDate: '2025-07-10T07:00:00+07:00',
      docTime: '12:15:00',
    },
    {
      code: '20250712104500-005-005',
      title:
        'Lorem ipsum dolor sit amet,consec tetur adipiscing elit,sed do eiusmod.',
      titleEN: '',
      imageUrl:
        'https://lc.we-builds.com/wb-document/images/banner/banner_251834322.png',
      imageBanner:
        'https://lc.we-builds.com/wb-document/images/banner/banner_251834322.png',
      productCode: '',
      sequence: 5,
      category: 'politics',
      description:
        '<p>Lorem ipsum dolor sit amet,consec tetur adipiscing elit,sed do eiusmod.Lorem ipsum dolor sit amet,consec tetur adipiscing elit,sed do eiusmod.Lorem ipsum dolor sit amet,consec tetur adipiscing elit,sed do eiusmod.Lorem ipsum dolor sit amet,consec tetur adipiscing elit,sed do eiusmod.Lorem ipsum dolor sit amet,consec tetur adipiscing elit,sed do eiusmod.Lorem ipsum dolor sit amet,consec tetur adipiscing elit,sed do eiusmod.Lorem ipsum dolor sit amet,consec tetur adipiscing elit,sed do eiusmod.</p>',
      descriptionEN: '',
      createBy: 'editor5',
      createDate: '20250712104500',
      createTime: '10:45:00',
      updateBy: 'editor5',
      updateDate: '20250712133000',
      updateTime: '13:30:00',
      isActive: true,
      status: 'A',
      docDate: '2025-07-12T07:00:00+07:00',
      docTime: '10:45:00',
    },
    {
      code: '20250714160000-006-006',
      title:
        'Lorem ipsum dolor sit amet,consec tetur adipiscing elit,sed do eiusmod.',
      titleEN: '',
      imageUrl:
        'https://lc.we-builds.com/wb-document/images/banner/banner_251834322.png',
      imageBanner:
        'https://lc.we-builds.com/wb-document/images/banner/banner_251834322.png',
      productCode: '',
      sequence: 6,
      category: 'politics',
      description:
        '<p>Lorem ipsum dolor sit amet,consec tetur adipiscing elit,sed do eiusmod.Lorem ipsum dolor sit amet,consec tetur adipiscing elit,sed do eiusmod.Lorem ipsum dolor sit amet,consec tetur adipiscing elit,sed do eiusmod.Lorem ipsum dolor sit amet,consec tetur adipiscing elit,sed do eiusmod.Lorem ipsum dolor sit amet,consec tetur adipiscing elit,sed do eiusmod.Lorem ipsum dolor sit amet,consec tetur adipiscing elit,sed do eiusmod.Lorem ipsum dolor sit amet,consec tetur adipiscing elit,sed do eiusmod.</p>',
      descriptionEN: '',
      createBy: 'editor6',
      createDate: '20250714160000',
      createTime: '16:00:00',
      updateBy: 'editor6',
      updateDate: '20250714173000',
      updateTime: '17:30:00',
      isActive: true,
      status: 'A',
      docDate: '2025-07-07T07:00:00+07:00',
      docTime: '16:00:00',
    },
    {
      code: '20250716110000-007-007',
      title:
        'Lorem ipsum dolor sit amet,consec tetur adipiscing elit,sed do eiusmod.',
      titleEN: '',
      imageUrl:
        'https://lc.we-builds.com/wb-document/images/banner/banner_251834322.png',
      imageBanner:
        'https://lc.we-builds.com/wb-document/images/banner/banner_251834322.png',
      productCode: '',
      sequence: 7,
      category: 'politics',
      description:
        '<p>Lorem ipsum dolor sit amet,consec tetur adipiscing elit,sed do eiusmod.Lorem ipsum dolor sit amet,consec tetur adipiscing elit,sed do eiusmod.Lorem ipsum dolor sit amet,consec tetur adipiscing elit,sed do eiusmod.Lorem ipsum dolor sit amet,consec tetur adipiscing elit,sed do eiusmod.Lorem ipsum dolor sit amet,consec tetur adipiscing elit,sed do eiusmod.Lorem ipsum dolor sit amet,consec tetur adipiscing elit,sed do eiusmod.Lorem ipsum dolor sit amet,consec tetur adipiscing elit,sed do eiusmod.</p>',
      descriptionEN: '',
      createBy: 'editor7',
      createDate: '20250716110000',
      createTime: '11:00:00',
      updateBy: 'editor7',
      updateDate: '20250716130000',
      updateTime: '13:00:00',
      isActive: true,
      status: 'A',
      docDate: '2025-07-16T07:00:00+07:00',
      docTime: '11:00:00',
    },
  ];

  constructor(
    private route: ActivatedRoute,
    private serviceProvider: ServiceProvider,
    public translate: TranslateService,
        private router: Router,
    
  ) {}

  ngOnInit(): void {
    this.code = this.route.snapshot.paramMap.get('code')!;

    this.newsDetail = this.modelDataList.find((f) => f.code == this.code);
  }

  goBack() {
    this.router.navigate(['/event-calendar']);
  }
}
