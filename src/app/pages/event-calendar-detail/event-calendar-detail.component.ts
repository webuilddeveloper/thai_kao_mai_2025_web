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
  model: any;

  constructor(
    private route: ActivatedRoute,
    private serviceProvider: ServiceProvider,
    public translate: TranslateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.code = this.route.snapshot.paramMap.get('code')!;

    this.callRead();
  }

  goBack() {
    this.router.navigate(['/event-calendar']);
  }

  callRead() {
    this.serviceProvider
      .post('m/EventCalendar/read', { code: this.code })
      .subscribe((res) => {
        let data: any = {};
        data = res;
        this.model = data?.objectData[0];
      });
  }
}
