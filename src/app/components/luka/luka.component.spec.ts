import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LukaComponent } from './luka.component';

describe('LukaComponent', () => {
  let component: LukaComponent;
  let fixture: ComponentFixture<LukaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LukaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LukaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
