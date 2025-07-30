import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ServiceProvider } from 'src/app/shared/service-provider.service';

@Component({
  selector: 'app-register-member',
  templateUrl: './register-member.component.html',
  styleUrls: ['./register-member.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RegisterMemberComponent implements OnInit {
  constructor(
    private serviceProvider: ServiceProvider,
    public translate: TranslateService
  ) {}
  deviceSize: string = '';
  isModalOpen = false;
  showPopup = false;
  currentPopupText = '';
  currentCheckboxIndex: number | null = null;

  tempCheckboxElement: HTMLInputElement | null = null;
  tempCheckboxPrevChecked = false;

  checkboxItems = [
    {
      label: `consentReceiveNewsEventsOtherInformationEmail`,
      checked: false,
      pdpaDetail:
        'consentReceiveNewsEventsOtherInformationEmail',
    },
    {
      label: `การลงทะเบียนสมาชิกพรรคในครั้งนี้ ข้าพเจ้ากระทำโดยความสมัครใจของข้าพเจ้าเองและเงิน
ค่าบำรุงพรรคเป็นของข้าพเจ้า รวมทั้งข้าพเจ้าเป็นผู้มีคุณสมบัติและไม่มีลักษณะต้องห้ามตามมาตรา 24 แห่ง
พรป.ว่าด้วยพรรคการเมือง พ.ศ. 2560 และหากพรรคตรวจสอบแล้วพบว่า ข้อมูล ดังกล่าวไม่เป็นความจริง
พรรคอาจปฏิเสธการลงทะเบียนเป็นสมาชิกพรรค ของข้าพเจ้าได้`,
      checked: false,
      pdpaDetail:
        'รายละเอียด PDPA การลงทะเบียนสมาชิกพรรคในครั้งนี้ ข้าพเจ้ากระทำโดยความสมัครใจของข้าพเจ้าเองและเงินค่าบำรุงพรรคเป็นของข้าพเจ้า รวมทั้งข้าพเจ้าเป็นผู้มีคุณสมบัติและไม่มีลักษณะต้องห้ามตามมาตรา 24 แห่ง พรป.ว่าด้วยพรรคการเมือง พ.ศ. 2560 และหากพรรคตรวจสอบแล้วพบว่า ข้อมูล ดังกล่าวไม่เป็นความจริงพรรคอาจปฏิเสธการลงทะเบียนเป็นสมาชิกพรรค ของข้าพเจ้าได้',
    },
    {
      label: `ข้าพเจ้าตกลงยินยอมให้พรรคไทยก้าวใหม่สามารถเก็บรวบรวม ใช้ และเปิดเผยข้อมูลส่วนบุคคลสำหรับ
ข้อมูลภาพถ่ายบัตรประจำตัวประชาชนของข้าพเจ้าที่ทำการถ่ายภาพและข้อมูลต่าง ๆ ในภาพดังกล่าว ได้แก่
เลขบัตรประจำตัวประชาชน ชื่อ นามสกุล วันเดือนปีเกิด ที่อยู่ วันที่ออกบัตร วันบัตรหมดอายุ
และรูปถ่ายของข้าพเจ้าในบัตรประจำตัวประชาชน และรูปถ่ายใบหน้าของข้าพเจ้า ทั้งนี้เพื่อเป็นการตรวจสอบ
และยืนยันตัวตนในการลงทะเบียนและเป็นหลักฐานในการลงทะเบียนสมาชิกพรรค`,
      checked: false,
      pdpaDetail:
        'ข้าพเจ้าตกลงยินยอมให้พรรคไทยก้าวใหม่สามารถเก็บรวบรวม ใช้ และเปิดเผยข้อมูลส่วนบุคคลสำหรับข้อมูลภาพถ่ายบัตรประจำตัวประชาชนของข้าพเจ้าที่ทำการถ่ายภาพและข้อมูลต่าง ๆ ในภาพดังกล่าว ได้แก่ เลขบัตรประจำตัวประชาชน ชื่อ นามสกุล วันเดือนปีเกิด ที่อยู่ วันที่ออกบัตร วันบัตรหมดอายุ และรูปถ่ายของข้าพเจ้าในบัตรประจำตัวประชาชน และรูปถ่ายใบหน้าของข้าพเจ้า ทั้งนี้เพื่อเป็นการตรวจสอบ และยืนยันตัวตนในการลงทะเบียนและเป็นหลักฐานในการลงทะเบียนสมาชิกพรรค',
    },
  ];

  ngOnInit(): void {
    this.deviceSize = localStorage.getItem('deviceSize') || '';
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  onCheckboxClick(
    index: number,
    checkbox: HTMLInputElement,
    event: MouseEvent
  ) {
    const item = this.checkboxItems[index];

    if (item.checked) {
      // ถ้าติ๊กอยู่แล้ว → ยกเลิกทันที
      item.checked = false;
      checkbox.checked = false;
      return;
    }

    // ยังไม่ติ๊ก → เปิด popup เพื่อยืนยัน
    event.preventDefault();

    this.currentCheckboxIndex = index;
    this.currentPopupText = item.pdpaDetail;
    this.showPopup = true;
    document.body.style.overflow = 'hidden';

    this.tempCheckboxElement = checkbox;
    this.tempCheckboxPrevChecked = checkbox.checked;
  }

  confirmCheckbox() {
    if (this.currentCheckboxIndex !== null) {
      this.checkboxItems[this.currentCheckboxIndex].checked = true;
      if (this.tempCheckboxElement) {
        this.tempCheckboxElement.checked = true;
      }
    }
    this.closePopup(false);
  }

  closePopup(uncheck = true) {
    if (uncheck && this.currentCheckboxIndex !== null) {
      this.checkboxItems[this.currentCheckboxIndex].checked =
        this.tempCheckboxPrevChecked;
      if (this.tempCheckboxElement) {
        this.tempCheckboxElement.checked = this.tempCheckboxPrevChecked;
      }
    }
    this.showPopup = false;
    this.currentCheckboxIndex = null;
    this.tempCheckboxElement = null;
    document.body.style.overflow = '';
  }
}
