import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAndServiceDetailsComponent } from './product-and-service-details.component';

describe('ProductAndServiceDetailsComponent', () => {
  let component: ProductAndServiceDetailsComponent;
  let fixture: ComponentFixture<ProductAndServiceDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductAndServiceDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductAndServiceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
