import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminTableTemplateComponent } from '../components/admin-table-template.component';


describe('AdminTableTemplateComponent', () => {
  let component: AdminTableTemplateComponent;
  let fixture: ComponentFixture<AdminTableTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminTableTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTableTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
