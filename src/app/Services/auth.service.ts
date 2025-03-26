import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { OAuthEvent, OAuthErrorEvent, OAuthSuccessEvent } from 'angular-oauth2-oidc';
import { LoginStatusCheckServiceService } from './login-status-check-service.service';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

interface OAuthErrorParams {
  error: string;
  error_description: string;
}

@Injectable({
  providedIn: 'root'
})


export class AuthService {
  constructor(private oauthService: OAuthService, 
              private http:HttpClient,
              private loginstatuscheckservice:LoginStatusCheckServiceService,
              private router:Router
            ) {
    this.configureOAuth();
  }

  public userRole:any;
  public profilepicture: any;
  public email:any;
  public username:any;

  private configureOAuth() {
    this.oauthService.configure({
      issuer: 'https://dev-23jl6hcwap6zsa4n.us.auth0.com/', // Your Auth0 or other Identity provider's domain
      redirectUri: 'http://localhost:5000/login', // Callback URL after login
      clientId: '0wWmE5XJ8RNcCzPaha3XeWUBZ46WdeaD', // Your Angular app's client ID from the identity provider
      responseType: 'code', // Authorization code flow
      scope: 'openid email profile',  // Include email scope here
      showDebugInformation: true, // Optional, for debugging
      logoutUrl: 'http://localhost:5000/login', // Logout URL
      tokenEndpoint: 'https://dev-23jl6hcwap6zsa4n.us.auth0.com/oauth/token', // Token endpoint
      revocationEndpoint: 'https://dev-23jl6hcwap6zsa4n.us.auth0.com/oauth/revoke',
    });
  
    this.oauthService.events.subscribe((event: OAuthEvent) => {
      if (event instanceof OAuthErrorEvent) {
          this.router.navigate(['/login']);        
      } 
      else if (event instanceof OAuthSuccessEvent) {  
          const claims = this.oauthService.getIdentityClaims();
          if(!claims['email_verified']){
            this.verifyjobhunterdatabase(claims['email']);
          }
          else{
            this.email=claims['email'];
            this.username=claims['name'];
            this.userRole=claims['jobhunter-roles'];
            this.profilepicture=claims['picture'];
            this.loginstatuscheckservice.login();
            this.loginstatuscheckservice.RoleCheck(claims['jobhunter-roles']);
            this.router.navigate(['/home']); 
          }      
      }
    });

    this.oauthService.loadDiscoveryDocument().then(() => {
      this.oauthService.tryLogin();
    });
  }


  public authlogin() {

    this.oauthService.initCodeFlow(); 

  }

  public logout() {
    if (this.oauthService.hasValidAccessToken()) {
      this.oauthService.logOut();
    }  
    sessionStorage.clear();
  }

  public getAccessToken() {
    return this.oauthService.getAccessToken();
  }



  verifyjobhunterdatabase(email:any){
      const requestBody = {
        emailid: email,
        verificationtoken: '',
        verified:"Not-Verified"
      };
      console.log("1  ",requestBody );

      this.http.post('http://0.0.0.0:80/api/register/triggerverifyemailsinglesignon',requestBody).subscribe({
        next:(response:any)=>{
          
          if(response.message="Verified"){
            const claims = this.oauthService.getIdentityClaims();
            this.userRole=claims['jobhunter-roles'];
            this.loginstatuscheckservice.login();
            this.loginstatuscheckservice.RoleCheck(claims['jobhunter-roles']);
            this.router.navigate(['/home']); 
          }
          else{
                this.logout();
                this.router.navigate(['/login'],{
                  queryParams: {
                    response: "Success"
                  }
                });  
          } 
        },
        error:(err:any)=>{
          let resp=err.error.message=="Duplicate Email!"?"Duplicate":"Failure"
          this.router.navigate(['/login'],{
                  queryParams: {
                    response: resp,
                  }
                }); 
        }
      }); 
    }


    getUserDetails(){
    
      const token = sessionStorage.getItem('Token');
      if (token) {
        const decoded: any = jwtDecode(token);  
        return decoded;
      } 
      return;
    }
  }
  

  



