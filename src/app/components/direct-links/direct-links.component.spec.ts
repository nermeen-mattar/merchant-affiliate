import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectLinksComponent } from './direct-links.component';

describe('DirectLinksComponent', () => {
  let component: DirectLinksComponent;
  let fixture: ComponentFixture<DirectLinksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectLinksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
