import { TestBed } from '@angular/core/testing';
import { FeedbackService } from '../services/feedback.service';

describe('FeedbackService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FeedbackService = TestBed.get(FeedbackService);
    expect(service).toBeTruthy();
  });
});
