import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {SlideshowModule} from 'ng-simple-slideshow'; // for Slider in login page
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTreeModule} from '@angular/material/tree';

import { ChartModule } from 'angular2-chartjs';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { NgxSpinnerModule } from 'ngx-spinner';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactComponent } from './components/contact.component';
import { HomeComponent } from './components/home.component';
import { SigninComponent } from './components/signin.component';
import { AdminTableDialogComponent } from './components/admin.table.dialog';
import { AdminTablesComponent } from './components/admin-tables.component';
import { AdminTableTemplateComponent } from './components/admin-table-template.component';
import { CommonSnackBarComponent } from './components/common-snack-bar.component';
import { ExcelUploadDialogComponent } from './components/excel-upload-dialog.component';
import { PostmanComponent } from './components/postman.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FeedbackRpaComponent } from './components/feedback-rpa.component';
import { FeedbackRfaComponent } from './components/feedback-rfa.component';
import { InsightsTemplateComponent } from './components/insights-template.component';
import { FeedbackUrComponent } from './components/feedback-ur.component';
import { EventDataComponent } from './components/event-data.component';
import { UploadDataComponent } from './components/upload-data.component';
import { ErrorComponent } from './components/error.component';
import { LoadingComponent } from './components/loading.component';
import { SuccessComponent } from './components/success.component';
// import { LoadingService } from './services/loading.service';
// import { AuthenticationService } from './services/authentication.service';
// import { AppConstants } from './models/Appconstants';

@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    HomeComponent,
    SigninComponent,
    AdminTableDialogComponent,
    AdminTablesComponent,
    AdminTableTemplateComponent,
    CommonSnackBarComponent,
    ExcelUploadDialogComponent,
    PostmanComponent,
    FeedbackRpaComponent,
    FeedbackRfaComponent,
    InsightsTemplateComponent,
    FeedbackUrComponent,
    EventDataComponent,
    UploadDataComponent,
    ErrorComponent,
    LoadingComponent,
    SuccessComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    SlideshowModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatSidenavModule,
    MatTabsModule,
    MatDividerModule,
    MatListModule,
    MatSnackBarModule,
    MatSelectModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    ChartModule,
    ChartsModule,
    MatToolbarModule,
    MatTreeModule,
    NgxSpinnerModule
  ],
   providers: [],
  bootstrap: [AppComponent],
  exports: [],
  entryComponents: [AdminTableDialogComponent, CommonSnackBarComponent, ExcelUploadDialogComponent]
})
export class AppModule { }