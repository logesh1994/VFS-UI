import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FeedbackRfaComponent } from '../components/feedback-rfa.component';


describe('FeedbackRfaComponent', () => {
  let component: FeedbackRfaComponent;
  let fixture: ComponentFixture<FeedbackRfaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbackRfaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackRfaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
