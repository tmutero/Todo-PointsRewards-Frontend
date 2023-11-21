import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { TasksComponent } from './pages/tasks/tasks.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NoAccessComponent } from './pages/no-access/no-access.component';
import { AchievementComponent } from './pages/achievement/achievement.component';
import { StreaksComponent } from './pages/streaks/streaks.component';
import { RegisterComponent } from './pages/register/register.component';
import { AddEditTasksComponent } from './pages/tasks/add-edit-tasks/add-edit-tasks.component';
import { AdminPortalComponent } from './pages/admin/admin-portal/admin-portal.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
  },
  { path: 'no-access', component: NoAccessComponent },

  {
    path: 'tasks',
    canActivate: [AuthGuard],
    component: TasksComponent,
    data: { roles: ['Admin', 'User'] },
  },
  {
    path: 'register',
    component: RegisterComponent,
  },

  {
    path: 'achievements',
    canActivate: [AuthGuard],
    component: AchievementComponent,
    data: { roles: ['Admin', 'User'] },
  },
  {
    path: 'streaks',
    canActivate: [AuthGuard],
    component: StreaksComponent,
    data: { roles: ['Admin', 'User'] },
  },
  {
    path: 'create-task',
    canActivate: [AuthGuard],
    component: AddEditTasksComponent,
    data: { roles: ['Admin', 'User'] },
  },

  {
    path: 'edit-task/:id',
    component: AddEditTasksComponent,
    data: { roles: ['Admin', 'User'] },
    canActivate: [AuthGuard],
  },

  {
    path: 'home',
    canActivate: [AuthGuard],
    component: DashboardComponent,
    data: { roles: ['Admin', 'User'] },
  },
  {
    path: 'admin-portal',
    canActivate: [AuthGuard],
    component: AdminPortalComponent,
    data: { roles: ['Admin'] },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
