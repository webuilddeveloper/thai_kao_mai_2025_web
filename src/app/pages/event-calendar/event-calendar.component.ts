import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatCalendarCellCssClasses } from '@angular/material/datepicker';
import { TranslateService } from '@ngx-translate/core';
import { ServiceProvider } from 'src/app/shared/service-provider.service';

@Component({
  selector: 'app-event-calendar',
  templateUrl: './event-calendar.component.html',
  styleUrls: ['./event-calendar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class EventCalendarComponent implements OnInit {
  constructor(
    private serviceProvider: ServiceProvider,
    public translate: TranslateService
  ) {}
  months = [
    { id: 1, code: 'JAN', en: 'January', th: 'มกราคม' },
    { id: 2, code: 'FEB', en: 'February', th: 'กุมภาพันธ์' },
    { id: 3, code: 'MAR', en: 'March', th: 'มีนาคม' },
    { id: 4, code: 'APR', en: 'April', th: 'เมษายน' },
    { id: 5, code: 'MAY', en: 'May', th: 'พฤษภาคม' },
    { id: 6, code: 'JUN', en: 'June', th: 'มิถุนายน' },
    { id: 7, code: 'JUL', en: 'July', th: 'กรกฎาคม' },
    { id: 8, code: 'AUG', en: 'August', th: 'สิงหาคม' },
    { id: 9, code: 'SEP', en: 'September', th: 'กันยายน' },
    { id: 10, code: 'OCT', en: 'October', th: 'ตุลาคม' },
    { id: 11, code: 'NOV', en: 'November', th: 'พฤศจิกายน' },
    { id: 12, code: 'DEC', en: 'December', th: 'ธันวาคม' },
  ];
  modelDataListCurrent: any[] = [];
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
  selectedDate: Date = new Date(); // Set initial date
  highlightedDates = new Set<string>();

  onDateSelected(date: Date | null): void {
    if (date) {
      this.selectedDate = date;
      this.getDataCurrent();
    }
  }

  dateClass(): (date: Date) => MatCalendarCellCssClasses {
    return (date: Date): MatCalendarCellCssClasses => {
      // แปลง date ของปฏิทินแต่ละช่องให้เป็นรูปแบบ 'YYYY-MM-DD'
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const dateString = `${year}-${month}-${day}`;

      // ตรวจสอบว่าวันที่นี้มีอยู่ใน Set ของเราหรือไม่
      if (this.highlightedDates.has(dateString)) {
        return 'highlight-date'; // ถ้ามี ให้ใช้ class 'highlight-date'
      }

      return ''; // ถ้าไม่มี ไม่ต้องทำอะไร
    };
  }

  ngOnInit(): void {
    this.modelDataList.forEach((event) => {
      const eventDate = new Date(event.docDate);
      const year = eventDate.getFullYear();
      const month = String(eventDate.getMonth() + 1).padStart(2, '0'); // Month เป็น 0-indexed (0-11) เลยต้อง +1
      const day = String(eventDate.getDate()).padStart(2, '0');

      this.highlightedDates.add(`${year}-${month}-${day}`);
      this.getDataCurrent();
    });
  }

  getBuddhistYear(date: Date | null): string {
    if (!date) return '';
    const year = date.getFullYear() + 543;
    return year.toString();
  }

  getMonthName(date: Date | null): string {
    if (!date) return '';
    const month = date.getMonth();
    var lang = localStorage.getItem('lang');
    var monthName = this.months.find((f) => f.id == month);

    if (lang == 'th') return monthName!.th;
    else return monthName!.en;

  }

  getDataCurrent() {
    this.modelDataListCurrent = this.modelDataList.filter((event) => {
      const eventDate = new Date(event.docDate);
      // เปรียบเทียบ ปี, เดือน, และวัน ของ event กับวันที่ถูกเลือก
      return (
        eventDate.getFullYear() === this.selectedDate.getFullYear() &&
        eventDate.getMonth() === this.selectedDate.getMonth() &&
        eventDate.getDate() === this.selectedDate.getDate()
      );
    });
  }
}
