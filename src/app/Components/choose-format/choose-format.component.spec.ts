import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseFormatComponent } from './choose-format.component';

describe('ChooseFormatComponent', () => {
  let component: ChooseFormatComponent;
  let fixture: ComponentFixture<ChooseFormatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseFormatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseFormatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
