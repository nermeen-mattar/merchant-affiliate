import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxDealDetailsComponent } from './ngx-deal-details.component';

describe('NgxDealDetailsComponent', () => {
  let component: NgxDealDetailsComponent;
  let fixture: ComponentFixture<NgxDealDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxDealDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxDealDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
