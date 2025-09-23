import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {
  MatCalendar,
  MatCalendarCellCssClasses,
} from '@angular/material/datepicker';
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
    { id: 0, code: 'JAN', en: 'January', th: 'มกราคม' },
    { id: 1, code: 'FEB', en: 'February', th: 'กุมภาพันธ์' },
    { id: 2, code: 'MAR', en: 'March', th: 'มีนาคม' },
    { id: 3, code: 'APR', en: 'April', th: 'เมษายน' },
    { id: 4, code: 'MAY', en: 'May', th: 'พฤษภาคม' },
    { id: 5, code: 'JUN', en: 'June', th: 'มิถุนายน' },
    { id: 6, code: 'JUL', en: 'July', th: 'กรกฎาคม' },
    { id: 7, code: 'AUG', en: 'August', th: 'สิงหาคม' },
    { id: 8, code: 'SEP', en: 'September', th: 'กันยายน' },
    { id: 9, code: 'OCT', en: 'October', th: 'ตุลาคม' },
    { id: 10, code: 'NOV', en: 'November', th: 'พฤศจิกายน' },
    { id: 11, code: 'DEC', en: 'December', th: 'ธันวาคม' },
  ];
  deviceSize: string = '';
  modelDataListCurrent: any[] = [];
  modelDataList: any[] = [];
  modelDatalatest: any = null;
  selectedDate: Date = new Date(); // Set initial date
  highlightedDates = new Set<string>();

  @ViewChild(MatCalendar) calendar: MatCalendar<Date> | undefined;

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
    this.serviceProvider.SendIPAddress('event-calendar');
    this.deviceSize = localStorage.getItem('deviceSize') || '';
    this.callRead();
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
      // แปลง dateStart, dateEnd จาก 'YYYYMMDD' → Date
      const startStr = `${event.dateStart.slice(0, 4)}-${event.dateStart.slice(
        4,
        6
      )}-${event.dateStart.slice(6, 8)}`;
      const endStr = `${event.dateEnd.slice(0, 4)}-${event.dateEnd.slice(
        4,
        6
      )}-${event.dateEnd.slice(6, 8)}`;

      const startDate = new Date(startStr);
      const endDate = new Date(endStr);

      // เคลียร์เวลาให้เป็นเที่ยงคืน เพื่อความแม่นยำในการเทียบ
      const selected = new Date(this.selectedDate);
      selected.setHours(0, 0, 0, 0);
      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(0, 0, 0, 0);

      // เปรียบเทียบว่า selectedDate อยู่ในช่วง dateStart - dateEnd
      return selected >= startDate && selected <= endDate;
    });
  }

  callRead() {
    this.serviceProvider.post('m/EventCalendar/read', {}).subscribe((res) => {
      let data: any = {};
      data = res;
      this.modelDataList = data.objectData;
      this.modelDatalatest =
        this.modelDataList
          .filter(
            (f: any) => f.dateEnd && this.parseYYYYMMDD(f.dateEnd) <= new Date()
          )
          .sort(
            (a: any, b: any) =>
              this.parseYYYYMMDD(b.dateEnd).getTime() -
              this.parseYYYYMMDD(a.dateEnd).getTime()
          )[0] ?? null;

      this.modelDataList.forEach((event) => {
        const formattedStart = `${event.dateStart.slice(
          0,
          4
        )}-${event.dateStart.slice(4, 6)}-${event.dateStart.slice(6, 8)}`;
        const formattedEnd = `${event.dateEnd.slice(
          0,
          4
        )}-${event.dateEnd.slice(4, 6)}-${event.dateEnd.slice(6, 8)}`;

        const startDate = new Date(formattedStart);
        const endDate = new Date(formattedEnd);

        const currentDate = new Date(startDate); // clone เพื่อไม่กระทบ startDate

        while (currentDate <= endDate) {
          const year = currentDate.getFullYear();
          const month = String(currentDate.getMonth() + 1).padStart(2, '0');
          const day = String(currentDate.getDate()).padStart(2, '0');

          this.highlightedDates.add(`${year}-${month}-${day}`);

          // เพิ่มวันละ 1
          currentDate.setDate(currentDate.getDate() + 1);
        }

        if (this.calendar) {
          this.calendar.updateTodaysDate();
        }
        this.getDataCurrent();
      });
    });
  }

  parseYYYYMMDD(dateNumber: number): Date {
    const dateStr = dateNumber.toString();
    const year = +dateStr.substring(0, 4);
    const month = +dateStr.substring(4, 6) - 1; // JavaScript months are 0-indexed
    const day = +dateStr.substring(6, 8);
    return new Date(year, month, day);
  }
}
