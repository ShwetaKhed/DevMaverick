import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuburbDetailsComponent } from './suburb-details.component';

describe('SuburbDetailsComponent', () => {
  let component: SuburbDetailsComponent;
  let fixture: ComponentFixture<SuburbDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuburbDetailsComponent]
    });
    fixture = TestBed.createComponent(SuburbDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
