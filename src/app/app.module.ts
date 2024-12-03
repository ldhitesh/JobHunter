import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Components/home/home.component';
import { CompaniesComponentComponent } from './Components/companies-component/companies-component.component';
import { LoginComponentComponent } from './Components/login-component/login-component.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegisterUserComponent } from './Components/register-user/register-user.component';
import { CompanyDataFilterPipe } from './Pipes/CompanyDataFilter';
import { SearchBarComponent } from './Components/search-bar/search-bar.component';
import { AddCompanyButtonComponent } from './Components/add-company-button/add-company-button.component';
import { AddCompanyFormComponent } from './Components/add-company-form/add-company-form.component';
import { ResumeBuilderComponent } from './Components/resume-builder/resume-builder.component';
import { ReferencesComponent } from './Components/references/references.component';
import { EmailComponent } from './Components/email/email.component';
import { SendEmailsComponent } from './Components/send-emails/send-emails.component';
import { AddReferenceFormComponent } from './Components/add-reference-form/add-reference-form.component';
import { AddReferenceButtonComponent } from './Components/add-reference-button/add-reference-button.component';
import { SendEmailButtonComponent } from './Components/send-email-button/send-email-button.component';
import { PopupwindowComponent } from './Components/popupwindow/popupwindow.component';
import { RegistrationsComponent } from './Components/registrations/registrations.component';
import { PortfolioComponent } from './Components/portfolio/portfolio.component';
import { MaskEmailPipe } from './Pipes/mask-email.pipe';
import { CheckoutComponent } from './Components/checkout/checkout.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';  // <-- Import animations module

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CompaniesComponentComponent,
    LoginComponentComponent,
    RegisterUserComponent,
    CompanyDataFilterPipe,
    SearchBarComponent,
    AddCompanyButtonComponent,
    AddCompanyFormComponent,
    ResumeBuilderComponent,
    ReferencesComponent,
    EmailComponent,
    SendEmailsComponent,
    AddReferenceFormComponent,
    AddReferenceButtonComponent,
    SendEmailButtonComponent,
    PopupwindowComponent,
    RegistrationsComponent,
    PortfolioComponent,
    MaskEmailPipe,
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,  // <-- Add this to enable animations
    ToastrModule.forRoot() 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
