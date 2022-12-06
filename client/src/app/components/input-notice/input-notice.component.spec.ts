import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputNoticeComponent } from './input-notice.component';

describe('InputNoticeComponent', () => {
  let component: InputNoticeComponent;
  let fixture: ComponentFixture<InputNoticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputNoticeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputNoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
