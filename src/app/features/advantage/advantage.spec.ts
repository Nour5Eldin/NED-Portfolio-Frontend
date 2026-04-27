import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Advantage } from './advantage';

describe('Advantage', () => {
  let component: Advantage;
  let fixture: ComponentFixture<Advantage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Advantage],
    }).compileComponents();

    fixture = TestBed.createComponent(Advantage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
