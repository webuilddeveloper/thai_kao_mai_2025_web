import {
  Component,
  ElementRef,
  HostListener,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import moment from 'moment';

@Component({
  selector: 'app-main-dialog',
  templateUrl: './main-dialog.component.html',
  styleUrls: ['./main-dialog.component.css'],
})
export class MainDialogComponent implements OnInit {
@ViewChild('outMainPopup') droppedYear!: ElementRef;
  constructor(
    @Inject(MAT_DIALOG_DATA) public modelMainPopup: any,
    private router: Router,
    private dialogRef: MatDialogRef<MainDialogComponent>
  ) {
    setInterval(() => {
      this.setIndexMainPopup('next', this.selectedMainPopupIndex);
    }, 4000);
  }
  isShowDialog = false;
  selectedMainPopupIndex: number = 0;
  notShowAgain: boolean = false;
  hidePopup: boolean = true;
  userProfile: any;

  @HostListener('document:mousedown', ['$event'])
  onClick(event: MouseEvent): void {
    if (!this.hidePopup)
      if ((event.target as Element).className)
        if (!this.droppedYear.nativeElement.contains(event.target)) {
          this.hidePopup = true;
          this.dialogRef.close();
        }
  }

  ngOnInit(): void {
    this.userProfile = localStorage.getItem('token');
    if (this.modelMainPopup.length > 0) {
      this.checkDateMainPopup();
    }
  }
  setIndexMainPopup(type: string, index: number) {
    if (type == 'next') {
      index += 1;
      if (index == this.modelMainPopup.length) {
        index = 0;
      }
    }
    this.selectedMainPopupIndex = index;
  }

  async checkDateMainPopup() {
    let datePopup = localStorage.getItem('datePopup');
    var curDate = moment().format('YYYY-MM-DD');
    datePopup;
    this.hidePopup = await moment(curDate).isSameOrBefore(datePopup);
    if (this.hidePopup) this.dialogRef.close();
  }

  nextMinaPopup(param : any) {
    if (param != undefined) {
      var count = this.modelMainPopup.length;
      if (param == count) param = 0;
      else if (param < 0) param = count - 1;
      this.selectedMainPopupIndex = param;
      // this.chk = true;
    }
  }

  checkShowAgain(param: any) {
    if (param) {
      this.notShowAgain = !this.notShowAgain;
      var curDate = moment().format('YYYY-MM-DD');
      localStorage.setItem('datePopup', curDate);
    } else {
      localStorage.removeItem('datePopup');
      console.log('hidden backdrop');
    }
  }

  openRef(param: any) {
    console.log('isChkLogin >>>> 1', param.isChkLogin);
    let url = param.linkUrl;
    if (param.isChkLogin) {
      if (this.userProfile != null) {
        if (param.action == 'out') {
          if (!url.match(/^https?:\/\//i)) {
            url = 'http://' + url;
          }
          window.open(url);
        } else if (param.action == 'in') {
          this.hidePopup = true;
          this.dialogRef.close();
          this.router.navigate(['content-banner'], { queryParams: { code: param.code, type: 'popup' } });
        }
      } else {
        this.dialogRef.close();
        this.router.navigate(['login'], {});
      }
    } else {
      if (param.action == 'out') {
        if (!url.match(/^https?:\/\//i)) {
          url = 'http://' + url;
        }
        window.open(url);
      } else if (param.action == 'in') {
        this.hidePopup = true;
        this.dialogRef.close();
        this.router.navigate(['content-banner'], { queryParams: { code: param.code, type: 'popup' } });
      }
    }
  }

  setNotShowMainPopup() {
    this.hidePopup = true;
    this.dialogRef.close();
  }

  navToMainPopupDetail(param: any) {
    console.log('isChkLogin >>>> 2', param.isChkLogin);

    if (param.isChkLogin) {
      if (this.userProfile != null) {
        this.hidePopup = true;
        this.dialogRef.close();
        this.router.navigate(['content-banner'], { queryParams: { code: param.code, type: 'popup' } });
      } else {
        this.router.navigate(['login'], {});
      }
    } else {
      this.hidePopup = true;
      this.dialogRef.close();
      this.router.navigate(['content-banner'], { queryParams: { code: param.code, type: 'popup' } });

    }
  }
}
