import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FeedbackRpaComponent } from '../components/feedback-rpa.component';

describe('FeedbackRpaComponent', () => {
  let component: FeedbackRpaComponent;
  let fixture: ComponentFixture<FeedbackRpaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbackRpaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackRpaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
