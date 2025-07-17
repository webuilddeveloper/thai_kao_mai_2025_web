import { Component } from '@angular/core';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent {
  previewProfileUrl: string | null = null;
  previewCardIDUrl: string | null = null;

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
}
