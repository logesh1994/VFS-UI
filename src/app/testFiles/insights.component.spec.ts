import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { InsightsTemplateComponent } from '../components/insights-template.component';

describe('InsightsTemplateComponent', () => {
  let component: InsightsTemplateComponent;
  let fixture: ComponentFixture<InsightsTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsightsTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsightsTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
