import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor() { }

  public employee_id: string;
  public feedback_option: string[];
  public feedback_type: string;
  public display_message: string;
  public event_detail_id: string;

}
