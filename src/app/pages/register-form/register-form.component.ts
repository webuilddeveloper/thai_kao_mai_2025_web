import { Component } from '@angular/core';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent {
  previewProfileUrl: string | null = null;
  previewCardIDUrl: string | null = null;
  previewSlipUrl: string | null = null;
  textToCopy: string = '';
  copySuccess = false;
  isModalOpen = false;

  onFileProfileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.previewProfileUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onFileCardIDelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.previewCardIDUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
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

  copyText() {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(this.textToCopy)
        .then(() => {
          this.copySuccess = true;
          setTimeout(() => this.copySuccess = false, 1500); // ซ่อนข้อความหลัง 1.5 วิ
        })
        .catch(err => {
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
  }

}
