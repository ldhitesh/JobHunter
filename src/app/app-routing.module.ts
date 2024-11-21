import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponentComponent } from './Components/login-component/login-component.component';
import { CompaniesComponentComponent } from './Components/companies-component/companies-component.component';
import { RegisterUserComponent } from './Components/register-user/register-user.component';
import { AddCompanyFormComponent } from './Components/add-company-form/add-company-form.component';
import { ReferencesComponent } from './Components/references/references.component';
import { EmailComponent } from './Components/email/email.component';

const routes: Routes = [
  {path:'login',component:LoginComponentComponent},
  {path:'companiescomponent',component:CompaniesComponentComponent},
  {path:'registerform',component:RegisterUserComponent},
  {path:'companieslist',component:CompaniesComponentComponent},
  {path:'addcompanyform',component:AddCompanyFormComponent},
  {path:'references',component:ReferencesComponent},
  {path:'sendemail',component:EmailComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
