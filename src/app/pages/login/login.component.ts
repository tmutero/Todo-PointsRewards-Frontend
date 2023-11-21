import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserModel } from 'src/app/model/user.model';
import { AuthService } from 'src/app/service/auth.service';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private titleService: Title,
    public auth: AuthService,
    public toastService: ToastService,
  ) {}
  hide = true;
  helper = new JwtHelperService();
  title = 'Login';
  loginForm!: FormGroup;
  userModel!: UserModel;

  ngOnInit() {
    this.titleService.setTitle(this.title);

    if (this.auth.isLoggedIn()) {
      this.router.navigate(['home'])
    }

    this.loginForm = this.formBuilder.group({
      username: [
        '',
        [
          Validators.required,
        ],
      ],
      password: ['', Validators.required],
      
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    if (this.loginForm.valid) {
     
      this.auth.login(this.loginForm.value).subscribe({
        next: (res) => {
          console.log(res)
          if (res != null) {
           
            var decoded = this.helper.decodeToken(res.access_token)
            this.auth.saveTokens(decoded);
            this.auth.saveBearer(res.access_token)
            this.router.navigate(['/home']);

          }
        },
        error: (error) => {
          this.toastService.showWarningToast('Failed to login', "Check your username or password if it is correct.");
        },
      });
    }
  }

  onBtnRegisterClick(){
    this.router.navigate(['/register']);

  }


}
