import { TestBed } from '@angular/core/testing';
import { HttpService } from '../services/http-service';


describe('HttpServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpService = TestBed.get(HttpService);
    expect(service).toBeTruthy();
  });
});
