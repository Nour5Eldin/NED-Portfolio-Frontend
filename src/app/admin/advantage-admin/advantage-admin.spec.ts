import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvantageAdmin } from './advantage-admin';

describe('AdvantageAdmin', () => {
  let component: AdvantageAdmin;
  let fixture: ComponentFixture<AdvantageAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdvantageAdmin],
    }).compileComponents();

    fixture = TestBed.createComponent(AdvantageAdmin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
