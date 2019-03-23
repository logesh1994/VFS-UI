import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTableDialogComponent } from '../components/admin.table.dialog';

describe('AddDialogComponent', () => {
  let component: AdminTableDialogComponent;
  let fixture: ComponentFixture<AdminTableDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminTableDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTableDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
