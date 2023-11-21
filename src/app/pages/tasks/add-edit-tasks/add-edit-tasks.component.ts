import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserModel } from 'src/app/model/user.model';
import { ApiService } from 'src/app/service/api.service';
import { AuthService } from 'src/app/service/auth.service';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-add-edit-tasks',
  templateUrl: './add-edit-tasks.component.html',
  styleUrls: ['./add-edit-tasks.component.css']
})
export class AddEditTasksComponent implements OnInit {

  constructor(
    private apiService: ApiService, 
    private formBuilder: FormBuilder,
    private router: Router,
    private titleService: Title,
    public auth: AuthService,
    public toastService: ToastService
  ) {}
  hide = true;
  helper = new JwtHelperService();
  title = 'Register';
  taskForm!: FormGroup;
  userModel!: UserModel;

  ngOnInit() {
    this.titleService.setTitle(this.title);

    this.taskForm = this.formBuilder.group({
      task_name: ['', [Validators.required]],
      description: ['', Validators.required],
      start_date: ['', Validators.required],
      due_date: ['', Validators.required],
      points: ['', Validators.required],
      priority: ['', Validators.required]
    });
  }

  get f() {
    return this.taskForm.controls;
  }

  onSubmit() {
    if (this.taskForm.valid) {
      let model = this.taskForm.value;

      model.user_id = this.auth.getCurrentUserDetails().id

      this.apiService.addTask(model).subscribe({
        next: (res) => {
          
          if (res != null) {
            this.router.navigate(['/tasks']);
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

  onBtnCancelClick() {
    this.router.navigate(['/tasks']);
  }


}
