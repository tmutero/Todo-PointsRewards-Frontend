import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-achievement',
  templateUrl: './achievement.component.html',
  styleUrls: ['./achievement.component.css']
})
export class AchievementComponent implements OnInit {

  constructor(private apiService: ApiService) {}


  ngOnInit(): void {
    this.retrieveTasks();
  }

  achievements: any = [];


  retrieveTasks() {
    this.apiService.retrieveAchievementsByUserId().subscribe({
      next: (result) => {
        this.achievements = result;
      },
      error: (e) => {},
    });
  }

}
