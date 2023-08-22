import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExplorationComponent } from './exploration.component';

describe('ExplorationComponent', () => {
  let component: ExplorationComponent;
  let fixture: ComponentFixture<ExplorationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExplorationComponent]
    });
    fixture = TestBed.createComponent(ExplorationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
