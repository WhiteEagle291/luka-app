import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrodComponent } from './brod.component';

describe('BrodComponent', () => {
  let component: BrodComponent;
  let fixture: ComponentFixture<BrodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrodComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
