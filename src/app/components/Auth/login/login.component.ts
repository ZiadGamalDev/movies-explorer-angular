import { Component } from '@angular/core';

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  ValidatorFn,
  AbstractControl,
  FormControlOptions,
} from '@angular/forms';
import { AuthService } from '../../../core/service/auth.service';
import { Route, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { WishlistService } from '../../../core/service/wishlist.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {



  constructor(private _authService: AuthService, private _router: Router, private _WishListService:WishlistService) {}
  
    errMessage: string = '';
    isLoaded: boolean = false;
    loginForm: FormGroup = new FormGroup(
      {
       
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9_@]{6,}$/),
        ]),
     
      },
  
      
    );
    
  
    handleForm(): void {
      const userData = this.loginForm.value;
      this.isLoaded = true;
      if (this.loginForm.valid === true) {
        this._authService.login(userData).subscribe({
          next: (response) => {
            console.log(response);
            if (response.message == 'success') {
              localStorage.setItem('etoken',response.token)
              this._authService.decodeUser()
              this.isLoaded = false;
              this._router.navigate(['/home']);
              this._WishListService.loadUserWishlist()

            }
           
          },
          error: (error) => {
            console.log(error);
            console.log(error.error.message)
  
            this.errMessage = error.error.message;
            this.isLoaded = false;
          },
        });
      }
    }



}
