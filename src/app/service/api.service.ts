import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { TasksModel } from '../model/tasks.model';
import { AchievementModel } from '../model/achievement';
import { UsersModel } from '../model/user.model';
import { ReportAdminModel } from '../model/report.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  headers: HttpHeaders;
  base_url = environment.apiUrl;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient, private _auth: AuthService) {
    this.headers = new HttpHeaders();
  }

  retrieveTasks(): Observable<TasksModel[]> {
    return this.http.get<TasksModel[]>(
      `${this.base_url}/task/get_all_tasks`
    );
  }

  reportTasks(): Observable<ReportAdminModel[]> {
    return this.http.get<ReportAdminModel[]>(
      `${this.base_url}/task/report_tasks/${this._auth.getCurrentUserDetails().id}`
    );
  }

  reportPieMetrics(): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.base_url}/task/pie_chart_metrics/${this._auth.getCurrentUserDetails().id}`
    );
  }
  

  retrieveTasksUserId(): Observable<TasksModel[]> {
    return this.http.get<TasksModel[]>(
      `${this.base_url}/task/get_tasks_by_user_id/${this._auth.getCurrentUserDetails().id}`
    );
  }


  retrieveUsers(): Observable<UsersModel[]> {
    return this.http.get<UsersModel[]>(
      `${this.base_url}/user/get_all`
    );
  }

  retrieveAchievements(): Observable<AchievementModel[]> {
    return this.http.get<AchievementModel[]>(
      `${this.base_url}/achievement/get_all_achievement`
    );
  }
  

  retrieveAchievementsByUserId(): Observable<AchievementModel[]> {
    return this.http.get<AchievementModel[]>(
      `${this.base_url}/achievement/get_achievement_by_user_id/${this._auth.getCurrentUserDetails().id}`
    );
  }

  addTask(taskModel: any): Observable<any> {
    return this.http.post(
      `${this.base_url}/task/create_task`,
      JSON.stringify(taskModel),
      this.httpOptions
    );
  }

}
