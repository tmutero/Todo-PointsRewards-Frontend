import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-admin-portal',
  templateUrl: './admin-portal.component.html',
  styleUrls: ['./admin-portal.component.css']
})
export class AdminPortalComponent {


  constructor(private apiService: ApiService,     private router: Router,
    ) {}

  ngOnInit(): void {
    this.getAllMetrics();
  }

  tasks: any = [];
  users: any = [];
  achievements: any = [];


  
  getAllMetrics() {
    forkJoin([
      this.apiService.retrieveTasks(),
      this.apiService.retrieveUsers(),
      this.apiService.retrieveAchievements(),

    ]).subscribe(
      ([
        _tasks,
        _users,
        _achievements

      ]) => {
       this.tasks = _tasks;
       this.users = _users;
       this.achievements = _achievements;
      }
    );
  }
}
