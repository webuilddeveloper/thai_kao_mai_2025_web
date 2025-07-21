import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  deviceSize: string = '';

  visionItems = [
    { title: 'ประชาชนคือศูนย์กลาง', desc: 'ทุกนโยบายมุ่งตอบโจทย์ชีวิตจริงของประชาชน' },
    { title: 'โปร่งใส ตรวจสอบได้', desc: 'สร้างระบบเปิดเผยข้อมูลภาครัฐแบบ real-time' },
    { title: 'พลังของคนรุ่นใหม่', desc: 'ส่งเสริมการมีส่วนร่วมของคนรุ่นใหม่ทุกระดับ' },
    { title: 'เศรษฐกิจเท่าเทียม', desc: 'สร้างโอกาสให้ทุกภาคส่วนเติบโตร่วมกัน' },
  ];


  ngOnInit(): void {
    AOS.init({
      duration: 1000,
      offset: 20,
      once: false,
      mirror: true,
    });

    setTimeout(() => {
      AOS.refresh();
    }, 100);
  }
}
