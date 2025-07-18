import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})

export class ThemeService {
  private themes = ['dark-theme', 'blindness-theme'];
  private currentThemeClass: string = '';

  setTheme(theme: string) {
    // ลบธีมเก่าออกก่อน
    if (this.currentThemeClass) {
      document.body.classList.remove(this.currentThemeClass);
    }

    // ถ้าเป็น default (light) ก็ไม่ต้องใส่ class
    if (theme && this.themes.includes(theme)) {
      document.body.classList.add(theme);
      this.currentThemeClass = theme;
    } else {
      this.currentThemeClass = '';
    }

    // บันทึกธีมไว้
    localStorage.setItem('theme', theme);
  }

  loadThemeFromStorage() {
    const savedTheme = localStorage.getItem('theme');
    this.setTheme(savedTheme ?? '');
  }
}
