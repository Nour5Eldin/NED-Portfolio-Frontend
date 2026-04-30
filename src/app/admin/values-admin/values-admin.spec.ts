import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValuesAdmin } from './values-admin';

describe('ValuesAdmin', () => {
  let component: ValuesAdmin;
  let fixture: ComponentFixture<ValuesAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValuesAdmin],
    }).compileComponents();

    fixture = TestBed.createComponent(ValuesAdmin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
