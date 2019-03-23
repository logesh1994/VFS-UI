import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FeedbackUrComponent } from '../components/feedback-ur.component';

describe('FeedbackUrComponent', () => {
  let component: FeedbackUrComponent;
  let fixture: ComponentFixture<FeedbackUrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbackUrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackUrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
