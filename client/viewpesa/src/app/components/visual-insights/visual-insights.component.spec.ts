import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualInsightsComponent } from './visual-insights.component';

describe('VisualInsightsComponent', () => {
  let component: VisualInsightsComponent;
  let fixture: ComponentFixture<VisualInsightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualInsightsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualInsightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
