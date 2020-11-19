import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/_services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  loading = false;
  submitted = false;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    if(this.authService.currentUserValue){
      this.router.navigate(['/']);
    }
   }

  ngOnInit(): void {
  }

  getEmailErrorMessage(): string {
    if (this.email.hasError('required')) {
      return 'You must enter your email';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getPasswordErrorMessage(): string {
    return this.password.hasError('required') ? 'You must enter your password' : '';
  }

  onSubmit(): void {
    this.submitted = true;

    this.loading = true;
    this.authService.login(this.email.value, this.password.value)
        .pipe(first())
        .subscribe({
            next: () => {
                const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
                this.router.navigate([returnUrl]);
            },
            error: error => {
                this.error = error;
                this.loading = false;
            }
        });
  }
}
