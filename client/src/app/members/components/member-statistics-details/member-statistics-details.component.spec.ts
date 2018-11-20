import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberStatisticsDetailsComponent } from './member-statistics-details.component';

describe('MemberStatisticsDetailsComponent', () => {
  let component: MemberStatisticsDetailsComponent;
  let fixture: ComponentFixture<MemberStatisticsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberStatisticsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberStatisticsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
