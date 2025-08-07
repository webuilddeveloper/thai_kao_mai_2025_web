import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ServiceProvider } from 'src/app/shared/service-provider.service';
import * as AOS from 'aos';
import { Router } from '@angular/router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { FileUploadService } from 'src/app/shared/file-upload.service';
import { ToastrService } from 'ngx-toastr';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.scss'],
})
export class DonateComponent implements AfterViewInit {
  paymentType: string = 'qr'; // ตั้งค่าเริ่มต้น

  showForm: boolean = false;
  formType: string = 'person'; // ค่าเริ่มต้นคือบุคคล
  firstName: string = '';
  lastName: string = '';
  @ViewChild('numberEl', { static: true }) numberEl!: ElementRef;
  @ViewChild('observerSection') observerSection!: ElementRef;
  previewSlipUrl: string | null = null;

  targetAmount = 1000000;
  currentAmount = 0;
  targetDisplayAmount = 234500;
  percentage = 0;
  targetNumber = 234500;
  digits: string[] = [];
  deviceSize: string = '';
  model: any = {
    paymentType: '0',
    amount: 1000,
    donateType: '0',
    slip: '',
  };
  myForm!: FormGroup;
  @Input() code = 'none';
  @ViewChildren('digitRef') digitRefs!: QueryList<ElementRef>;
  constructor(
    private serviceProvider: ServiceProvider,
    private fileuploadService: FileUploadService,
    public translate: TranslateService,
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngAfterViewInit(): void {
    const digitsStr = this.targetNumber.toString().padStart(6, '0');
    this.digits = digitsStr.split('');

    ScrollTrigger.create({
      trigger: this.observerSection.nativeElement,
      start: 'top 70%',
      once: true,
      onEnter: () => {
        this.animateDigits();
        this.donateTotal();
      },
    });
  }

  ngOnInit(): void {
    this.serviceProvider.SendIPAddress('donate');
    this.deviceSize = localStorage.getItem('deviceSize') || '';
    AOS.init({
      duration: 800,
      once: false,
      mirror: true,
      offset: 30,
    });

    setTimeout(() => {
      AOS.refresh();
    }, 100);
  }

  selectMethod(method: string) {
    this.model.paymentType = method;
  }

  presetAmounts: number[] = [2000, 1000, 500];
  selectedAmount: number | null = 1000; // ค่าเริ่มต้น
  customAmount: number | null = null;

  selectAmount(amount: number | null) {
    if (amount !== null) {
      this.model.amount = amount;
    } else {
      this.model.amount = 0;
    }

    console.log('>>>>>', this.model.amount);
  }

  step: number = 1;

  goToStep(stepNumber: number) {
    console.log(this.model);

    this.step = stepNumber;
    if (this.step == 1) {
      let isValid = false;
    }
  }

  phone: string = '';
  email: string = '';

  qrImageUrl: string = './assets/img/QR2.png'; // เปลี่ยนเป็น dynamic URL ได้ในอนาคต

  completeDonation() {
    switch (this.model.paymentType) {
      case '1':
        this.model.category = '20250804130401-891-150';
        break;
      case '2':
        this.model.category = '20250804131738-344-798';
        break;
      case '3':
        this.model.category = '20250804131800-215-508';
        break;
      default:
        this.model.category = '20250804130401-891-150';
        break;
    }

    this.serviceProvider.post('donate/create', this.model).subscribe(
      (data) => {
        let model: any = {};
        model = data;

        if (model.status === 'S') {
          // this.spinner.hide();
          this.toastr.success('บันทึกข้อมูลสำเร็จ', 'แจ้งเตือนระบบ', {
            timeOut: 2000,
          });
          // setTimeout(() => {
          //   this.back();
          // }, 2000);
          this.goToStep(4); // ไป step 4 แสดงหน้าขอบคุณ
        } else {
          // this.spinner.hide();
          this.toastr.warning(model.message, 'แจ้งเตือนระบบ', {
            timeOut: 2000,
          });
        }
      },
      (err) => {
        this.toastr.error(err.message, 'แจ้งเตือนระบบ', { timeOut: 2000 });
      }
    );
  }

  backToMain() {
    this.router.navigate(['/home']);
  }

  animateDigits(): void {
    const digitArray = this.digitRefs.toArray();
    const delayPerDigit = 0.2;
    const randomCount = 20;
    const singleDigitDuration = 0.04;

    digitArray.forEach((digitEl, i) => {
      const element = digitEl.nativeElement;
      const finalValue = this.digits[i];

      const tl = gsap.timeline({ delay: i * delayPerDigit });

      for (let j = 0; j < randomCount; j++) {
        tl.to(element, {
          text: { value: Math.floor(Math.random() * 10).toString() },
          duration: singleDigitDuration,
          ease: 'none',
        });
      }

      tl.to(element, {
        text: { value: finalValue },
        duration: singleDigitDuration,
        ease: 'power1.out',
      });
    });
  }

  donateTotal() {
    const duration = 2000;
    const frameRate = 60;
    const totalFrames = Math.round(duration / (1000 / frameRate));
    let frame = 0;

    const amountIncrement = this.targetDisplayAmount / totalFrames;

    const animate = () => {
      frame++;
      this.currentAmount = Math.min(
        this.targetDisplayAmount,
        Math.round(amountIncrement * frame)
      );
      this.percentage = (this.currentAmount / this.targetAmount) * 100;

      if (frame < totalFrames) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }

  onFileSlipSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.previewSlipUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  fileUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.fileuploadService.postFile(this.code, input.files[0]).subscribe(
        (data) => {
          let model: any = {};
          model = data;
          this.model.slip = model.imageUrl;
        },
        (err) => {
          console.log('error ', err);
        }
      );
    }
  }

  // อนุญาตให้พิมพ์เฉพาะตัวเลข
  allowOnlyNumber(event: KeyboardEvent): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    }
    return true;
  }

  // ตรวจสอบเลขบัตรประชาชน 13 หลัก
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

  onSubmit(formRef: NgForm, stepNumber: number) {
    if (formRef.invalid) {
      // mark ทุก field เป็น touched เพื่อให้แสดง error
      Object.values(formRef.controls).forEach((control) => {
        control.markAsTouched();
      });

      return; // ไม่ให้ submit ต่อถ้า form ไม่ valid
    }

    this.goToStep(stepNumber);
  }
}
