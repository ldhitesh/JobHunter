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

const routes: Routes = [
  {path:'login',component:LoginComponentComponent},
  {path:'registerform',component:RegisterUserComponent},
  {path:'companieslist',component:CompaniesComponentComponent,canActivate: [authGuard]},
  {path:'addcompanyform',component:AddCompanyFormComponent,canActivate: [authGuard]},
  {path:'references',component:ReferencesComponent,canActivate: [authGuard]},
  {path:'sendemail',component:EmailComponent,canActivate: [authGuard]},
  {path:'addreferenceform',component:AddReferenceFormComponent,canActivate: [authGuard]},
  {path:'sendreferalemail',component:SendEmailsComponent,canActivate: [authGuard]},
  {path:'home',component:HomeComponent},
  {path:'registrations',component:RegistrationsComponent,canActivate: [authGuard]}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
