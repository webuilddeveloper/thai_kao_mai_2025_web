import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as AOS from 'aos';


@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.scss']
})
export class PolicyComponent implements OnInit {

  constructor(
    private router: Router,
  ) {

  }
  policies = [
    {
      code: '1',
      imageUrl: "./assets/img/policy_cover2.webp",
      title: 'นโยบายการศึกษาไทย',
      description: 'เด็กทุกคนควรมีโอกาสเรียนรู้ ไม่ว่าจะอยู่มุมไหนของประเทศ'
    },
    {
      code: '2',
      imageUrl: "./assets/img/policy_cover2.webp",
      title: 'นโยบายการศึกษาไทย',
      description: 'เด็กทุกคนควรมีโอกาสเรียนรู้ ไม่ว่าจะอยู่มุมไหนของประเทศ'
    }

  ];

  ngOnInit(): void {
    AOS.init({
      duration: 1000,
      offset: 100,
      once: false,
      mirror: true,

    });

    setTimeout(() => {
      AOS.refresh();
    }, 100);

  }

  goToDetail(param: any) {
    this.router.navigate(['/policy-detail', param], {
    });
  }
}
