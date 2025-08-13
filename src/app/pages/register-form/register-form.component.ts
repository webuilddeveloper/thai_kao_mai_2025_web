import { Component } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
import { FileUploadService } from 'src/app/shared/file-upload.service';
import { ServiceProvider } from 'src/app/shared/service-provider.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent {
  previewProfileUrl: string | null = null;
  previewCardIDUrl: string | null = null;
  previewSlipUrl: string | null = null;
  textToCopy: string = '0970000000';
  copySuccess = false;
  isModalOpen = false;
  showPopup = false;
  currentPopupText = '';
  currentCheckboxIndex: number | null = null;
  listProvince: any = [];
  listDistrict: any = [];
  listSubDistrict: any = [];
  listDistrictIssue: any = [];
  copyIDCardName: string = '';
  copyHouseRegistrationName: string = '';
  nameChangeCertificateName: string = '';
  model: any = {
    prefixName: '',
    provinceBirthCode: '',
    provinceBirth: '',
    membershipType: 'monthly',
    provinceIssueCode: '',
    districtIssueCode: '',
    provinceCode: '',
    amphoeCode: '',
    tambonCode: '',
    postnoCode: '',
    partyRegisterHistory: 'never',
    acceptChk: false,
  };
  deviceSize: string = '';

  tempCheckboxElement: HTMLInputElement | null = null;
  tempCheckboxPrevChecked = false;
  isBtn: boolean = false;

  checkboxItems = [
    {
      label: `การลงทะเบียนสมาชิกพรรคในครั้งนี้ ข้าพเจ้ากระทำโดยความสมัครใจของข้าพเจ้าเองและเงิน
ค่าบำรุงพรรคเป็นของข้าพเจ้า รวมทั้งข้าพเจ้าเป็นผู้มีคุณสมบัติและไม่มีลักษณะต้องห้ามตามมาตรา 24 แห่ง
พรป.ว่าด้วยพรรคการเมือง พ.ศ. 2560 และหากพรรคตรวจสอบแล้วพบว่า ข้อมูล ดังกล่าวไม่เป็นความจริง
พรรคอาจปฏิเสธการลงทะเบียนเป็นสมาชิกพรรค ของข้าพเจ้าได้`,
      labelEN:
        'This party membership registration is of my own free will and the party maintenance fees are my own. Furthermore, I possess the qualifications and do not possess any disqualifications under Section 24 of the Political Party Act B.E. 2560. If, upon review by the party, the information is found to be untrue, the party may reject my party membership registration.',
      checked: false,
      pdpaDetail:
        'รายละเอียด PDPA การลงทะเบียนสมาชิกพรรคในครั้งนี้ ข้าพเจ้ากระทำโดยความสมัครใจของข้าพเจ้าเองและเงินค่าบำรุงพรรคเป็นของข้าพเจ้า รวมทั้งข้าพเจ้าเป็นผู้มีคุณสมบัติและไม่มีลักษณะต้องห้ามตามมาตรา 24 แห่ง พรป.ว่าด้วยพรรคการเมือง พ.ศ. 2560 และหากพรรคตรวจสอบแล้วพบว่า ข้อมูล ดังกล่าวไม่เป็นความจริงพรรคอาจปฏิเสธการลงทะเบียนเป็นสมาชิกพรรค ของข้าพเจ้าได้',
      pdpaDetailEN: `PDPA Details: This party membership registration is done voluntarily by me and the party's membership fees are my own. Furthermore, I possess the qualifications and do not possess any disqualifications under Section 24 of the Political Party Act B.E. 2560. If the party, upon review, finds that the information is untrue, the party may reject my party membership registration.`,
    },
    {
      label: `ข้าพเจ้าตกลงยินยอมให้พรรคไทยก้าวใหม่สามารถเก็บรวบรวม ใช้ และเปิดเผยข้อมูลส่วนบุคคลสำหรับ
ข้อมูลภาพถ่ายบัตรประจำตัวประชาชนของข้าพเจ้าที่ทำการถ่ายภาพและข้อมูลต่าง ๆ ในภาพดังกล่าว ได้แก่
เลขบัตรประจำตัวประชาชน ชื่อ นามสกุล วันเดือนปีเกิด ที่อยู่ วันที่ออกบัตร วันบัตรหมดอายุ
และรูปถ่ายของข้าพเจ้าในบัตรประจำตัวประชาชน และรูปถ่ายใบหน้าของข้าพเจ้า ทั้งนี้เพื่อเป็นการตรวจสอบ
และยืนยันตัวตนในการลงทะเบียนและเป็นหลักฐานในการลงทะเบียนสมาชิกพรรค`,
      labelEN: `I hereby consent to the Thai Move Forward Party collecting, using, and disclosing my personal data for: My national identification card photo and the information contained in such photo, including: National identification card number, first name, last name, date of birth, address, card issue date, expiration date, my national identification card photo, and a photo of my face. This is for verification and to confirm my identity during registration and as evidence for party membership registration.`,
      checked: false,
      pdpaDetail:
        'ข้าพเจ้าตกลงยินยอมให้พรรคไทยก้าวใหม่สามารถเก็บรวบรวม ใช้ และเปิดเผยข้อมูลส่วนบุคคลสำหรับข้อมูลภาพถ่ายบัตรประจำตัวประชาชนของข้าพเจ้าที่ทำการถ่ายภาพและข้อมูลต่าง ๆ ในภาพดังกล่าว ได้แก่ เลขบัตรประจำตัวประชาชน ชื่อ นามสกุล วันเดือนปีเกิด ที่อยู่ วันที่ออกบัตร วันบัตรหมดอายุ และรูปถ่ายของข้าพเจ้าในบัตรประจำตัวประชาชน และรูปถ่ายใบหน้าของข้าพเจ้า ทั้งนี้เพื่อเป็นการตรวจสอบ และยืนยันตัวตนในการลงทะเบียนและเป็นหลักฐานในการลงทะเบียนสมาชิกพรรค',
      pdpaDetailEN: `I hereby consent to the Thai Kao Mai Party being able to collect, use, and disclose personal information regarding my national identification card photo taken and various information in such photo, including my national identification card number, name, surname, date of birth, address, card issue date, card expiration date, my national identification card photo, and a photo of my face. This is for verification and confirmation of my identity for registration and as evidence for party membership registration.`,
    },
  ];

  listPrefixName: any = [
    {
      value: 'นาย',
      title: 'นาย',
      titleEN: 'Mr',
    },
    {
      value: 'นาง',
      title: 'นาง',
      titleEN: 'Mrs',
    },
    {
      value: 'นางสาว',
      title: 'นางสาว',
      titleEN: 'Ms',
    },
  ];

  constructor(
    private serviceProvider: ServiceProvider,
    private fileuploadService: FileUploadService,
    public translate: TranslateService,
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.serviceProvider.SendIPAddress('register-form');
    this.deviceSize = localStorage.getItem('deviceSize') || '';
    this.readProvince();
      this.spinner.show();

    // 2. จำลองการทำงานที่ใช้เวลา (เช่น การเรียก API)
    setTimeout(() => {
      // 3. เมื่อทำงานเสร็จ ให้ซ่อน Spinner
      this.spinner.hide();
    }, 3000); // <-- ให้แสดงเป็นเวลา 3 วินาที
  }

  async onFileProfileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.fileuploadService.postFile('', input.files[0]).subscribe(
        (data) => {
          let model: any = {};
          model = data;
          this.model.imageUrl = model.imageUrl;
        },
        (err) => {
          console.log('error ', err);
        }
      );
    }
  }

  async onFilePhoto1_5(event: Event, formRef: NgForm) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.fileuploadService.postFile('', input.files[0]).subscribe(
        (data) => {
          const model: any = data;
          this.model.onFilePhoto1_5 = model.imageUrl; // ✅ ไม่ต้อง await
          this.onSubmit(formRef);
        },
        (err) => {
          console.log('error', err);
        }
      );
    }
  }

  // copyIDCardSelected(event: Event) {
  //   const input = event.target as HTMLInputElement;
  //   if (input.files && input.files.length > 0) {
  //     this.fileuploadService.postFile("", input.files[0]).subscribe(async data => {
  //       let model: any = {};
  //       model = data;
  //       this.model.copyIDCard = await model.imageUrl;
  //       this.copyIDCardName = await model.imageName;
  //       await this.onSubmit(formRef)
  //     }, err => {
  //       console.log('error ', err);
  //     });
  //   }
  // }

  copyIDCardSelected(event: Event, formRef: NgForm) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.fileuploadService.postFile('', input.files[0]).subscribe(
        (data) => {
          const model: any = data;
          this.model.copyIDCard = model.imageUrl;
          if (model.imageUrl != '') {
            let resultArray = model.imageUrl.split('.');
            let type = resultArray[resultArray.length - 1];
            if (type == 'pdf') {
              this.model.copyIDCardImg =
                'assets/img/267px-PDF_file_icon.svg.png';
            } else {
              this.model.copyIDCardImg = model.imageUrl;
            }
          }
          this.copyIDCardName = model.imageName;

          this.onSubmit(formRef); // ✅ เรียกหลังจากอัปโหลดเสร็จ
        },
        (err) => {
          console.log('error', err);
        }
      );
    }
  }

  copyHouseRegistrationSelected(event: Event, formRef: NgForm) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.fileuploadService.postFile('', input.files[0]).subscribe(
        (data) => {
          const model: any = data;
          this.model.copyHouseRegistration = model.imageUrl;
          this.copyHouseRegistrationName = model.imageName;
          if (model.imageUrl != '') {
            let resultArray = model.imageUrl.split('.');
            let type = resultArray[resultArray.length - 1];
            if (type == 'pdf') {
              this.model.copyHouseRegistrationImg =
                'assets/img/267px-PDF_file_icon.svg.png';
            } else {
              this.model.copyHouseRegistrationImg = model.imageUrl;
            }
          }

          this.onSubmit(formRef); // ✅ เรียกหลังจากอัปโหลดเสร็จ
        },
        (err) => {
          console.log('error', err);
        }
      );
    }
  }

  nameChangeCertificateSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.fileuploadService.postFile('', input.files[0]).subscribe(
        async (data) => {
          let model: any = {};
          model = data;
          this.model.nameChangeCertificate = await model.imageUrl;
          this.nameChangeCertificateName = await model.imageName;

          if (model.imageUrl != '') {
            let resultArray = model.imageUrl.split('.');
            let type = resultArray[resultArray.length - 1];
            if (type == 'pdf') {
              this.model.nameChangeCertificateImg =
                'assets/img/267px-PDF_file_icon.svg.png';
            } else {
              this.model.nameChangeCertificateImg = model.imageUrl;
            }
          }
        },
        (err) => {
          console.log('error ', err);
        }
      );
    }
  }

  copyText() {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(this.textToCopy)
        .then(() => {
          this.copySuccess = true;
          setTimeout(() => (this.copySuccess = false), 1500); // ซ่อนข้อความหลัง 1.5 วิ
        })
        .catch((err) => {
          console.error('ไม่สามารถคัดลอกได้', err);
          alert('คัดลอกไม่สำเร็จ');
        });
    } else {
      alert('เบราว์เซอร์ไม่รองรับการคัดลอก');
    }
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.router.navigate(['home'], {
      // skipLocationChange: true,
    });
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
    this.currentPopupText =
      this.translate.currentLang === 'th' ? item.pdpaDetail : item.pdpaDetailEN;
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

  readProvince() {
    this.serviceProvider.post('route/province/read', {}).subscribe(
      (data) => {
        let model: any = {};
        model = data;
        if (model.status == 'S') {
          this.listProvince = model.objectData;
        }
      },
      (err) => {}
    );
  }

  readDistrict(code: string) {
    this.serviceProvider
      .post('route/district/read', { province: code })
      .subscribe(
        (data) => {
          let model: any = {};
          model = data;
          this.listDistrict = model.objectData;
          console.log(this.listDistrict);
        },
        (err) => {}
      );
  }

  readSubDistrict(code: string) {
    this.serviceProvider
      .post('route/tambon/read', { district: code })
      .subscribe(
        (data) => {
          let model: any = {};
          model = data;
          this.listSubDistrict = model.objectData;
          console.log(this.listSubDistrict);
        },
        (err) => {}
      );
  }

  readDistrictIssue(code: string) {
    this.serviceProvider
      .post('route/district/read', { province: code })
      .subscribe(
        (data) => {
          let model: any = {};
          model = data;
          this.listDistrictIssue = model.objectData;
        },
        (err) => {}
      );
  }

  selectProvinceBirth(event: Event) {
    const value = event.target as HTMLInputElement;
    let model = this.listProvince.find((x: any) => x.code == value.value);
    this.model.provinceBirthCode = model.code;
    this.model.provinceBirth = model.title;
  }

  selectProvinceIssue(event: Event) {
    const value = event.target as HTMLInputElement;
    let model = this.listProvince.find((x: any) => x.code == value.value);
    this.model.provinceIssueCode = model.code;
    this.model.provinceIssue = model.title;
    this.readDistrictIssue(model.code);
    this.model.districtIssueCode = '';
    this.model.districtIssue = '';
  }

  selectDistrictIssue(event: Event) {
    const value = event.target as HTMLInputElement;
    let model = this.listDistrictIssue.find((x: any) => x.code == value.value);
    this.model.districtIssueCode = model.code;
    this.model.districtIssue = model.title;
  }

  selectProvince(event: Event) {
    const value = event.target as HTMLInputElement;
    let model = this.listProvince.find((x: any) => x.code == value.value);
    this.model.provinceCode = model.code;
    this.model.province = model.title;
    this.readDistrict(model.code);
    this.model.amphoeCode = '';
    this.model.amphoe = '';
    this.model.tambonCode = '';
    this.model.tambon = '';
    this.model.postnoCode = '';
  }

  selectDistrict(event: Event) {
    const value = event.target as HTMLInputElement;
    let model = this.listDistrict.find((x: any) => x.code == value.value);
    this.model.amphoeCode = model.code;
    this.model.amphoe = model.title;
    this.readSubDistrict(model.code);
    this.model.tambonCode = '';
    this.model.tambon = '';
    this.model.postnoCode = '';
  }

  selectSubDistrict(event: Event) {
    const value = event.target as HTMLInputElement;
    let model = this.listSubDistrict.find((x: any) => x.code == value.value);
    this.model.tambonCode = model.code;
    this.model.tambon = model.title;
    this.model.postnoCode = model.postCode;
  }

  sendApi() {
    this.model.status = 'N';
    this.serviceProvider
      .post('partyMembers/create', this.model)
      .subscribe((res) => {
        let data: any = {};
        data = res;
        this.openModal();
      });
  }

  partyRegisterHistoryChange(event: any) {
    if (event == 'ever') {
      this.model.partyRegisterHistory = 'ever';
    } else {
      this.model.partyRegisterHistory = 'never';
      this.model.partyOldName = '';
    }
  }

  onSubmit(formRef: NgForm) {
    if (formRef.invalid) {
      // mark ทุก field เป็น touched เพื่อให้แสดง error
      Object.values(formRef.controls).forEach((control) => {
        control.markAsTouched();
      });
      this.isBtn = false;
      return; // ไม่ให้ submit ต่อถ้า form ไม่ valid
    } else {
      let isValid = false;
      if (
        ((this.model.partyOldName ?? '') == '' ||
          this.model.partyOldName == undefined) &&
        this.model.partyRegisterHistory == 'ever'
      ) {
        isValid = true;
      }
      if (!this.model.acceptChk) {
        isValid = true;
      }
      if (
        (this.model.copyIDCard ?? '') == '' ||
        this.model.copyIDCard == undefined
      ) {
        isValid = true;
      }
      if (
        (this.model.copyHouseRegistration ?? '') == '' ||
        this.model.copyHouseRegistration == undefined
      ) {
        isValid = true;
      }
      if (
        (this.model.onFilePhoto1_5 ?? '') == '' ||
        this.model.onFilePhoto1_5 == undefined
      ) {
        isValid = true;
      }
      if (isValid) {
        this.isBtn = false;
        return;
      } else {
        this.isBtn = true;
      }
      // this.sendApi();
    }
  }

  chkAccept(param: any) {
    const checkbox = param.target as HTMLInputElement;
    this.model.acceptChk = checkbox.checked;
  }

  allowOnlyNumbers(event: KeyboardEvent) {
    const allowedKeys = [
      'Backspace',
      'ArrowLeft',
      'ArrowRight',
      'Tab',
      'Delete',
    ];

    // อนุญาตเฉพาะตัวเลข 0-9 และปุ่มที่จำเป็น
    if (!/^[0-9]$/.test(event.key) && !allowedKeys.includes(event.key)) {
      event.preventDefault(); // ❌ ป้องกันไม่ให้พิมพ์ตัวอักษร
    }
  }

  gotoRegisterFanclub() {
    this.router.navigate(['register-member'], {
      // skipLocationChange: true,
    });
  }

  fileDelete(param: string) {
    if (param == 'copyIDCard') {
      this.model.copyIDCard = null;
    } else if (param == 'copyHouseRegistration') {
      this.model.copyHouseRegistration = null;
    } else if (param == 'onFilePhoto1_5') {
      this.model.onFilePhoto1_5 = null;
    }
  }

  async selectFile(param: string, event: Event, formRef: NgForm) {
    if (param == 'copyIDCard') {
      await this.copyIDCardSelected(event, formRef);
    } else if (param == 'copyHouseRegistration') {
      this.copyHouseRegistrationSelected(event, formRef);
    } else if (param == 'onFilePhoto1_5') {
      await this.onFilePhoto1_5(event, formRef);
    }
    // this.onSubmit(formRef)
  }

  allowOnlyNumber(event: KeyboardEvent): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    }
    return true;
  }

  isValidNationalID(id: string): boolean {
    if ((id ?? '') === '') return true;
    if (!id || id.length !== 13) return false;

    let sum = 0;
    for (let i = 0; i < 12; i++) {
      sum += parseInt(id.charAt(i), 10) * (13 - i);
    }
    const checkDigit = (11 - (sum % 11)) % 10;
    return checkDigit === parseInt(id.charAt(12), 10);
  }

  calculateAge(birthDateStr: string) {
    if (!birthDateStr) return;

    const today = new Date();
    const birthDate = new Date(birthDateStr);

    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    // ตรวจสอบว่ายังไม่ถึงวันเกิดปีนี้
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    this.model.age = age;
  }
}
