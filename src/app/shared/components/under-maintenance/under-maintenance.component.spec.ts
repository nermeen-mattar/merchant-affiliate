import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnderMaintenanceComponent } from './under-maintenance.component';
import { TranslateModule } from '@ngx-translate/core';

describe('UnderMaintenanceComponent', () => {
  let component: UnderMaintenanceComponent;
  let fixture: ComponentFixture<UnderMaintenanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot()
      ],
      declarations: [ UnderMaintenanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnderMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
