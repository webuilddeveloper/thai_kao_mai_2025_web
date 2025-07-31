
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class Utilities {
  deviceInfo = null;
  deviceSize: string = ''
  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    // switch (window.innerWidth <= 768) {
    // case "news":
    //   this.router.navigate(["/news"]);
    //   break;
    // case "productAndService":
    //   this.router.navigate(["/product-and-Service"]);
    //   break;
    // case "ourTeam":
    //   this.router.navigate(["/out-team"]);
    //   break;
    // case "contractUs":
    //   this.router.navigate(["/contact-us"]);
    //   break;
    // default:
    //   this.router.navigate([""]);
    //   break;
    if (window.innerWidth > 1024) {
      this.deviceSize = 'd';
    } else if (window.innerWidth > 768) {
      this.deviceSize = 't';
    } else {
      this.deviceSize = 'm';
    }
    localStorage.setItem('deviceSize', this.deviceSize);
  }

  fontSizeDynamic = [
    { title: "p10", size: 10, value: 10 },
    { title: "p11", size: 11, value: 11 },
    { title: "p12", size: 12, value: 12 },
    { title: "p13", size: 13, value: 13 },
    { title: "p14", size: 14, value: 14 },
    { title: "p15", size: 15, value: 15 },
    { title: "p16", size: 16, value: 16 },
    { title: "p17", size: 17, value: 17 },
    { title: "p18", size: 18, value: 18 },
    { title: "p19", size: 19, value: 19 },
    { title: "p20", size: 20, value: 20 },
    { title: "p22", size: 22, value: 22 },
    { title: "p24", size: 24, value: 24 },
    { title: "p25", size: 25, value: 25 },
    { title: "p26", size: 26, value: 26 },
    { title: "p28", size: 28, value: 28 },
    { title: "p30", size: 30, value: 30 },
    { title: "p32", size: 32, value: 32 },
    { title: "p33", size: 33, value: 33 },
    { title: "p34", size: 34, value: 34 },
    { title: "p35", size: 35, value: 35 },
    { title: "p36", size: 36, value: 36 },
    { title: "p38", size: 38, value: 38 },
    { title: "p39", size: 39, value: 39 },
    { title: "p40", size: 40, value: 40 },
    { title: "p48", size: 48, value: 48 },
    { title: "p50", size: 50, value: 50 },
    { title: "p60", size: 60, value: 60 },
    { title: "p100", size: 100, value: 100 },
    { title: "p120", size: 120, value: 120 },
  ];

  device = [
    { title: "mobile", min: 0, max: 768 },
    { title: "tablet", min: 768, max: 1024 },
    { title: "desktop", min: 1025 },
  ]


}

