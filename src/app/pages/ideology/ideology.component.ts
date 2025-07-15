import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';

@Component({
  selector: 'app-ideology',
  templateUrl: './ideology.component.html',
  styleUrls: ['./ideology.component.scss']
})
export class IdeologyComponent implements OnInit {

  visionItems = [
    { title: 'ประชาชนคือศูนย์กลาง', desc: 'ทุกนโยบายมุ่งตอบโจทย์ชีวิตจริงของประชาชน' },
    { title: 'โปร่งใส ตรวจสอบได้', desc: 'สร้างระบบเปิดเผยข้อมูลภาครัฐแบบ real-time' },
    { title: 'พลังของคนรุ่นใหม่', desc: 'ส่งเสริมการมีส่วนร่วมของคนรุ่นใหม่ทุกระดับ' },
    { title: 'เศรษฐกิจเท่าเทียม', desc: 'สร้างโอกาสให้ทุกภาคส่วนเติบโตร่วมกัน' },
  ];


  ngOnInit(): void {
    AOS.init({
      duration: 1000,
      offset: 80,
      once: false,
      mirror: true,
      easing: 'ease-in-out'
    });

  }
}
