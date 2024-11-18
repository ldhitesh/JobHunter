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
    AddCompanyFormComponent
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
