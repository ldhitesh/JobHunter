import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponentComponent } from './Components/login-component/login-component.component';
import { CompaniesComponentComponent } from './Components/companies-component/companies-component.component';
import { RegisterUserComponent } from './Components/register-user/register-user.component';
import { AddCompanyFormComponent } from './Components/add-company-form/add-company-form.component';
import { ReferencesComponent } from './Components/references/references.component';
import { EmailComponent } from './Components/email/email.component';
import { AddReferenceFormComponent } from './Components/add-reference-form/add-reference-form.component';
import { SendEmailsComponent } from './Components/send-emails/send-emails.component';
import { HomeComponent } from './Components/home/home.component';
import { RegistrationsComponent } from './Components/registrations/registrations.component';
import { authGuard } from './Guards/auth.guard';
import { PortfolioComponent } from './Components/portfolio/portfolio.component';
import { EmailVerificationCompleteComponent } from './Components/email-verification-complete/email-verification-complete.component';
import { CreatepostComponent } from './Components/createpost/createpost.component';
import { ReplypostComponent } from './Components/replypost/replypost.component';
import { DiscussionForumComponent } from './Components/discussion-forum/discussion-forum.component';
import { WebApiConceptsComponent } from './Learning/web-api-concepts/web-api-concepts.component';
import { WebapidashboardComponent } from './Learning/webapidashboard/webapidashboard.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  {path:'',component:LoginComponentComponent},
  {path:'login',component:LoginComponentComponent},
  {path:'login/:session_id',component:LoginComponentComponent},
  {path:'registerform',component:RegisterUserComponent},
  {path:'registerform/:registerdetails',component:RegisterUserComponent},
  {path:'companieslist',component:CompaniesComponentComponent,canActivate: [authGuard]},
  {path:'addcompanyform',component:AddCompanyFormComponent,canActivate: [authGuard]},
  {path:'references',component:ReferencesComponent,canActivate: [authGuard]},
  {path:'sendemail',component:EmailComponent,canActivate: [authGuard]},
  {path:'addreferenceform',component:AddReferenceFormComponent,canActivate: [authGuard]},
  {path:'sendreferalemail',component:SendEmailsComponent,canActivate: [authGuard]},
  {path:'home',component:HomeComponent,canActivate: [authGuard]},
  {path:'registrations',component:RegistrationsComponent,canActivate: [authGuard]},
  {path:'app-portfolio',component:PortfolioComponent,canActivate: [authGuard]},
  {path: 'email-verification-complete', component: EmailVerificationCompleteComponent },
  { path: 'createpost', component: CreatepostComponent },
  { path: 'post/:id', component: ReplypostComponent },
  { path: 'discussionforum', component: DiscussionForumComponent },
  { path: 'webapiconcepts', component: WebApiConceptsComponent },
  { path: 'webapidashboard', component: WebapidashboardComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
