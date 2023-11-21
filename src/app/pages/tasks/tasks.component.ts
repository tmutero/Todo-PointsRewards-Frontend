import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ApiService } from 'src/app/service/api.service';
import { AddEditTasksComponent } from './add-edit-tasks/add-edit-tasks.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {

  constructor(private apiService: ApiService,     private router: Router,
    ) {}

  ngOnInit(): void {
    this.retrieveTasks();
  }

  tasks: any = [];


  retrieveTasks() {
    this.apiService.retrieveTasksUserId().subscribe({
      next: (result) => {
        this.tasks = result;
        console.log(this.tasks);
      },
      error: (e) => {},
    });
  }

  createTask() {
    this.router.navigate(['/create-task']);
  }


}
