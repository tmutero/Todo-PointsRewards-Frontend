import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserModel } from 'src/app/model/user.model';
import { AuthService } from 'src/app/service/auth.service';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private titleService: Title,
    public auth: AuthService,
    public toastService: ToastService
  ) {}
  hide = true;
  helper = new JwtHelperService();
  title = 'Register';
  registerForm!: FormGroup;
  userModel!: UserModel;

  ngOnInit() {
    this.titleService.setTitle(this.title);

    this.registerForm = this.formBuilder.group({
      first_name: ['', [Validators.required]],
      password: ['', Validators.required],
      email: ['', Validators.required],
      last_name: ['', Validators.required],
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value)
      this.auth.register(this.registerForm.value).subscribe({
        next: (res) => {
          
          if (res != null) {
            this.router.navigate(['/home']);
          }
        },
        error: (error) => {
          this.toastService.showWarningToast(
            'Failed to login',
            'Check your username or password if it is correct.'
          );
        },
      });
    }
  }

  onBtnLoginClick() {
    this.router.navigate(['/login']);
  }
}
