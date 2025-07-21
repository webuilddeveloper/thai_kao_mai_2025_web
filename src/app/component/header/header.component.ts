import { Component, HostListener } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { filter } from 'rxjs';
import * as AOS from 'aos';
import { ThemeService } from 'src/app/shared/theme.service';
import { DateAdapter } from '@angular/material/core';
import { Utilities } from 'src/app/shared/utilities';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isShow = 'false'; // เพิ่มตรงนี้

  langList = [
    { code: 1, name: 'TH', value: 'th', icon: './assets/icons/flag-th.jpg' },
    { code: 2, name: 'EN', value: 'en', icon: './assets/icons/flag-en.jpg' },
  ];

  langLocal: string = '';
  isActiveMarginBTM: boolean = true;
  position: String = 'inherit';
  selectedLang: any;
  subMenu: boolean = false;
  isOpenNav = false;
  selectedTheme = '';
  fontSizeSelect: number = 0;
  fontFromLocal: number = 0;
  font_size_difference: number = 3;
  selected = {
    code: 1,
    name: 'TH',
    value: 'th',
    icon: './assets/icons/flag-th.jpg',
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public translate: TranslateService,
    private themeService: ThemeService,
    private dateAdapter: DateAdapter<Date>,
    private utilities: Utilities
  ) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' }); // เลื่อนไปบนสุดแบบ smooth
      });

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // this.currentPath = event.urlAfterRedirects;
        // if (event.urlAfterRedirects == '/') {
        //   this.isActiveMarginBTM = false;
        //   this.position = "absolute";

        // } else {
        //   this.isActiveMarginBTM = true;
        //   this.position = "inherit"
        // }

        // this.isActiveMarginBTM = false;
        this.position = 'relative';
        console.log('Current path:', event.urlAfterRedirects);
      }
    });

    this.langLocal = localStorage.getItem('lang') ?? 'th';
    localStorage.setItem('lang', this.langLocal);

    // translate.addLangs(['th', 'en']);
    translate.setDefaultLang(this.langLocal);
    // translate.use('th');

    // const browserLang = translate.getBrowserLang();
    const browserLang = translate.getDefaultLang();
    translate.use(
      browserLang && browserLang.match(/th|en/) ? browserLang : 'th'
    );
  }

  scrollPosition: boolean = false;
  @HostListener('window:scroll', [])
  onWindowScroll() {
    let docElement = document.documentElement;
    let scTop = document.documentElement.clientHeight % 100;
    let scrollTotal = docElement.scrollHeight - docElement.clientHeight;
    let aaa =
      docElement.scrollTop /
      (docElement.scrollHeight - docElement.offsetHeight);
    // document.body.scrollHeight, document.documentElement.scrollHeight,
    // document.body.clientHeight, document.documentElement.clientHeight,
    // document.body.offsetHeight, document.documentElement.offsetHeight
    // console.log('aaa >>>>>>>>>>> ', aaa );
    // console.log('scrollTop ===>>>> ',document.documentElement.scrollTop);
    // console.log('clientHeight ===>>>> ',document.documentElement.clientHeight);
    // console.log('offsetHeight ===>>>> ',document.documentElement.offsetHeight);

    if ((window.pageYOffset || document.documentElement.scrollTop) > 1) {
      this.scrollPosition = true;
    } else if ((window.pageYOffset || document.documentElement.scrollTop) < 1) {
      this.scrollPosition = false;
    }
  }

  ngOnInit(): void {
    this.fontSizeSelect = isNaN(
      parseInt(sessionStorage.getItem('fontSizeSelect') || '')
    )
      ? 0
      : parseInt(sessionStorage.getItem('fontSizeSelect') || '');
    AOS.init({
      duration: 800,
      once: false,
      mirror: true,
      offset: 10,
    });

    setTimeout(() => {
      AOS.refresh();
    }, 100);

    // ✅ เรียกเช็ก localStorage แบบ real-time ทุก 500ms
    setInterval(() => {
      this.isShow = localStorage.getItem('isShow') ?? 'false'; // default เป็น true ถ้าไม่มีค่า
    }, 300);
    setTimeout(() => {
      this.changeSizeFont(this.fontSizeSelect);
    }, 301);
    this.themeService.loadThemeFromStorage();
    this.selectedTheme = localStorage.getItem('theme') ?? '';
    // this.translate.use(localStorage.getItem('lang') ?? '');
    //   var a = this.langList.find(
    //   (f) => f.value == (localStorage.getItem('lang') ?? 'th')
    // );
    this.selected = this.langList.find(
      (f) => f.value == (localStorage.getItem('lang') ?? 'th')
    ) ?? {
      code: 1,
      name: 'TH',
      value: 'th',
      icon: './assets/icons/flag-th.jpg',
    };
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
  }

  isOpen = false;
  activeSubMenu: string | null = null;

  toggleDropdown() {
    this.isOpen = !this.isOpen;
    this.isOpen2 = false; // ปิด dropdown อื่นๆ
    this.isOpen3 = false; // ปิด dropdown อื่นๆ
  }

  isOpen2 = false;
  toggleDropdown2() {
    this.isOpen2 = !this.isOpen2;
    this.isOpen = false; // ปิด dropdown อื่นๆ
    this.isOpen3 = false; // ปิด dropdown อื่นๆ
  }

  isOpen3 = false;
  toggleDropdown3() {
    this.isOpen3 = !this.isOpen3;
    this.isOpen = false; // ปิด dropdown อื่นๆ
    this.isOpen2 = false; // ปิด dropdown อื่นๆ
  }

  openHam() {
    // this.subMenu = !this.subMenu;
    // document.body.style.overflow = this.isOpenNav ? 'hidden' : '';
    document.body.style.overflow = 'hidden';
    this.isOpenNav = !this.isOpenNav;
  }

  closeHam() {
    this.isOpenNav = false;
    this.activeSubMenu = null;
    document.body.style.overflow = '';
  }

  selectOption(option: any) {
    this.selected = option;
    this.translate.use(option.value);
    localStorage.setItem('lang', option.value);
    this.dateAdapter.setLocale(option.value === 'th' ? 'th-TH' : 'en-US');
    this.isOpen = false;
  }

  toggleSubMenu(menuName: string) {
    // ถ้าคลิกเมนูที่เปิดอยู่แล้ว ให้ปิดมัน
    if (this.activeSubMenu === menuName) {
      this.activeSubMenu = null;
    } else {
      // ถ้าคลิกเมนูใหม่ ให้เปิดเมนูนั้น
      this.activeSubMenu = menuName;
    }
  }

  changeTheme(theme: string) {
    this.selectedTheme = theme;
    this.themeService.setTheme(theme);
  }

  changeSizeFont(idxFontSelect: number) {
    console.log('font');
    // this.fontModel.emit(idx);
    // this.fontFromLocal = isNaN(parseInt(sessionStorage.getItem('fontFromLocal'))) ? 0 : parseInt(sessionStorage.getItem('fontFromLocal'));
    idxFontSelect = isNaN(idxFontSelect) ? 0 : idxFontSelect;

    //คำนวนขนาดตัวอักษร
    this.utilities.fontSizeDynamic.forEach((element) => {
      let sizeFont;
      //ถ้าขนาดตัวอักษรเปลี่ยน
      // if ((idxFontSelect != this.fontFromLocal)) {
      isNaN(element.value) ? (element.value = element.size) : element.size;
      sizeFont = element.value ?? element.size;
      if (idxFontSelect < this.fontFromLocal) {
        sizeFont -=
          this.font_size_difference * (this.fontFromLocal - idxFontSelect);
      } else if (idxFontSelect > this.fontFromLocal) {
        sizeFont +=
          this.font_size_difference * (idxFontSelect - this.fontFromLocal);
      }
      // element.value = sizeFont;

      //เซ็ตขนาดตัวอักษรเข้าแต่ละ class
      const nodeList: any = document.querySelectorAll(`.${element.title}`);
      if (nodeList.length > 0) {
        for (let i = 0; i < nodeList.length; i++) {
          nodeList[i].style.fontSize = `${sizeFont}px`;
        }
      }
    });
    //เซ็ต id ของ font size เข้า local Storage
    // this.fontSizeSelect = isNaN(idxFontSelect) ? 0 : idxFontSelect;
    sessionStorage.setItem('fontSizeSelect', idxFontSelect.toString());
    this.fontSizeSelect = idxFontSelect;
    // sessionStorage.setItem('fontFromLocal', idxFontSelect.toString());
  }
}
