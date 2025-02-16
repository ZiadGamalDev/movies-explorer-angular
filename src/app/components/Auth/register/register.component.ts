import { CommonModule } from '@angular/common';
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

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  constructor(private _authService: AuthService, private _router: Router) {}

  errMessage: string = '';
  isLoaded: boolean = false;
  registerForm: FormGroup = new FormGroup(
    {
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9_@]{6,}$/),
      ]),
      rePassword: new FormControl('', Validators.required),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern(/^01[0125][0-9]{8}$/),
      ]),
    },

    { validators: [this.confirmPasswordCheck] } as FormControlOptions
  );
  confirmPasswordCheck(group: FormGroup): void {
    const password = group.get('password');
    const rePassword = group.get('rePassword');

    if (!password || !rePassword) return;

    if (!password.value) {
      rePassword.setErrors({ required: true });
    } else if (password.value !== rePassword.value) {
      rePassword.setErrors({ mismatch: true });
    } else {
      rePassword.setErrors(null);
    }
  }

  handleForm(): void {
    const userData = this.registerForm.value;
    this.isLoaded = true;
    if (this.registerForm.valid === true) {
      this._authService.register(userData).subscribe({
        next: (response) => {
          console.log(response);
          if (response.message == 'success') {
            this.isLoaded = false;
            this._router.navigate(['/login']);
          }
        },
        error: (error) => {
          console.log(error);

          this.errMessage = error.error.message;
          this.isLoaded = false;
        },
      });
    }
  }
}
