import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-and-service-details',
  templateUrl: './product-and-service-details.component.html',
  styleUrls: ['./product-and-service-details.component.scss']
})
export class ProductAndServiceDetailsComponent {

  model: any = {};
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,) {

    }
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.model = this.activatedRoute.snapshot.params;

    });

    console.log(this.model);

  }
}
