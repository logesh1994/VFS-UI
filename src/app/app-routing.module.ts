import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home.component';
import { ContactComponent } from './components/contact.component';
import { SigninComponent } from './components/signin.component';
import { AdminTablesComponent } from './components/admin-tables.component';
import { PostmanComponent } from './components/postman.component';
import { FeedbackRpaComponent } from './components/feedback-rpa.component';
import { FeedbackRfaComponent } from './components/feedback-rfa.component';
import { FeedbackUrComponent } from './components/feedback-ur.component';
import { EventDataComponent } from './components/event-data.component';
import { UploadDataComponent } from './components/upload-data.component';
import { ErrorComponent } from './components/error.component';
import { LoadingComponent } from './components/loading.component';
import { SuccessComponent } from './components/success.component';
import { InsightsComponent } from './components/insights.component';

const routes: Routes = [{ path: 'home', component: HomeComponent },
{ path: 'contact', component: ContactComponent },
{ path: 'signin', component: SigninComponent },
{ path: 'admin-tables', component: AdminTablesComponent },
{ path: 'postman', component: PostmanComponent },
{ path: 'feedback-RPA', component: FeedbackRpaComponent },
{ path: 'feedback-RFA', component: FeedbackRfaComponent },
{ path: 'insights', component: InsightsComponent},
{ path: 'feedback-UR', component: FeedbackUrComponent },
{ path: 'event-data', component: EventDataComponent },
{ path: 'upload-data', component: UploadDataComponent },
{ path: 'error', component: ErrorComponent },
{ path: 'loading', component: LoadingComponent },
{ path: 'success', component: SuccessComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
