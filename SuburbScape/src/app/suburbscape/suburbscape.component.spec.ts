import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuburbscapeComponent } from './suburbscape.component';

describe('SuburbscapeComponent', () => {
  let component: SuburbscapeComponent;
  let fixture: ComponentFixture<SuburbscapeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuburbscapeComponent]
    });
    fixture = TestBed.createComponent(SuburbscapeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
