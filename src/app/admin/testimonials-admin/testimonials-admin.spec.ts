import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestimonialsAdmin } from './testimonials-admin';

describe('TestimonialsAdmin', () => {
  let component: TestimonialsAdmin;
  let fixture: ComponentFixture<TestimonialsAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestimonialsAdmin],
    }).compileComponents();

    fixture = TestBed.createComponent(TestimonialsAdmin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
