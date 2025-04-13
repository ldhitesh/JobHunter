import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Components/home/home.component';
import { CompaniesComponentComponent } from './Components/companies-component/companies-component.component';
import { LoginComponentComponent } from './Components/login-component/login-component.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
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
import { RegistrationsComponent } from './Components/registrations/registrations.component';
import { PortfolioComponent } from './Components/portfolio/portfolio.component';
import { MaskEmailPipe } from './Pipes/mask-email.pipe';
import { CheckoutComponent } from './Components/checkout/checkout.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmailNotificationComponent } from './Components/email-notification/email-notification.component';
import { EmailVerificationCompleteComponent } from './Components/email-verification-complete/email-verification-complete.component';  // <-- Import animations module
import { OAuthModule } from 'angular-oauth2-oidc';
import { EcsFargateComponent } from './Learning/ecs-fargate/ecs-fargate.component';
import { WebApiConceptsComponent } from './Learning/web-api-concepts/web-api-concepts.component';
import { SystemDesignComponent } from './Learning/system-design/system-design.component';
import { ReactComponent } from './Learning/react/react.component';
import { AngularComponent } from './Learning/angular/angular.component';
import { LeetcodeComponent } from './Learning/leetcode/leetcode.component';
import { Auth0Component } from './Learning/auth0/auth0.component';
import { GmailApiComponent } from './Learning/gmail-api/gmail-api.component';
import { MySqlComponent } from './Learning/my-sql/my-sql.component';
import { DiscussionForumComponent } from './Components/discussion-forum/discussion-forum.component';
import { LearningPortalComponent } from './Components/learning-portal/learning-portal.component';
import { CreatepostComponent } from './Components/createpost/createpost.component';
import { ReplypostComponent } from './Components/replypost/replypost.component';
import { WebapidashboardComponent } from './Learning/webapidashboard/webapidashboard.component';
import { AngulardashboardComponent } from './Learning/angulardashboard/angulardashboard.component';
import { AwsdashboardComponent } from './Learning/awsdashboard/awsdashboard.component';
import { MysqldashboardComponent } from './Learning/mysqldashboard/mysqldashboard.component';
import { ReactdashboardComponent } from './Learning/reactdashboard/reactdashboard.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { GlobalNotificationsComponent } from './Components/global-notifications/global-notifications.component';
import { ResumeDataCollectionComponent } from './Components/resume-data-collection/resume-data-collection.component';
import { DatePipe } from '@angular/common';
import { ResumeGeneratorComponent } from './Components/resume-generator/resume-generator.component';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';

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
        RegistrationsComponent,
        PortfolioComponent,
        MaskEmailPipe,
        CheckoutComponent,
        EmailNotificationComponent,
        EmailVerificationCompleteComponent,
        EcsFargateComponent,
        WebApiConceptsComponent,
        SystemDesignComponent,
        ReactComponent,
        AngularComponent,
        LeetcodeComponent,
        Auth0Component,
        GmailApiComponent,
        MySqlComponent,
        DiscussionForumComponent,
        LearningPortalComponent,
        CreatepostComponent,
        ReplypostComponent,
        WebapidashboardComponent,
        AngulardashboardComponent,
        AwsdashboardComponent,
        MysqldashboardComponent,
        ReactdashboardComponent,
        NavbarComponent,
        GlobalNotificationsComponent,
        ResumeDataCollectionComponent,
        ResumeGeneratorComponent
    ],
    bootstrap: [AppComponent], 
    imports: [
        ChartModule,
        CommonModule,
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule, // <-- Add this to enable animations
        ToastrModule.forRoot(),
        OAuthModule.forRoot()], providers: [DatePipe, provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
