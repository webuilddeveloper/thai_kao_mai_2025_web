import { Component, HostListener } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { filter } from 'rxjs';
import * as AOS from 'aos';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isShow = 'false'; // เพิ่มตรงนี้

  langList: any = [
    { code: 1, name: 'TH', value: 'th', icon: './assets/icons/flag-th.jpg' },
    { code: 2, name: 'EN', value: 'en', icon: './assets/icons/flag-en.jpg' },
  ];

  langLocal: string = '';
  isActiveMarginBTM: boolean = true;
  position: String = 'inherit';
  selectedLang: any;
  subMenu: boolean = false;
  isOpenNav = false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public translate: TranslateService
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
    }, 500);
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
  }

  isOpen = false;
  activeSubMenu: string | null = null;

  selected = {
    code: 1,
    name: 'TH',
    value: 'th',
    icon: './assets/icons/flag-th.jpg',
  };

  toggleDropdown() {
    this.isOpen = !this.isOpen;
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
}
