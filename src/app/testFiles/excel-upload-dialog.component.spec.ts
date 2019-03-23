import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ExcelUploadDialogComponent } from '../components/excel-upload-dialog.component';


describe('ExcelUploadDialogComponent', () => {
  let component: ExcelUploadDialogComponent;
  let fixture: ComponentFixture<ExcelUploadDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExcelUploadDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExcelUploadDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
