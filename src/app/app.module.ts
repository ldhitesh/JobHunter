import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Components/home/home.component';
import { CompaniesComponentComponent } from './Components/companies-component/companies-component.component';
import { ResumeBuilderComponentComponent } from './Components/resume-builder-component/resume-builder-component.component';
import { PortfolioComponentComponent } from './Components/portfolio-component/portfolio-component.component';
import { LoginComponentComponent } from './Components/login-component/login-component.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegisterUserComponent } from './Components/register-user/register-user.component';
import { CompanyDataFilterPipe } from './Pipes/CompanyDataFilter';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CompaniesComponentComponent,
    ResumeBuilderComponentComponent,
    PortfolioComponentComponent,
    LoginComponentComponent,
    RegisterUserComponent,
    CompanyDataFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
