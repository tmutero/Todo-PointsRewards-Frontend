import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { LoaderComponent } from './pages/loader/loader.component';
import { AuthService } from './service/auth.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { GlobalInterceptor } from './interceptors/http.interceptor';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatButtonModule, MatCommonModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatSnackBar, MatSnackBarModule } from '@angular/material';
import { NoAccessComponent } from './pages/no-access/no-access.component';
import { AchievementComponent } from './pages/achievement/achievement.component';
import { StreaksComponent } from './pages/streaks/streaks.component';
import { CommonModule } from '@angular/common';
import { AddEditTasksComponent } from './pages/tasks/add-edit-tasks/add-edit-tasks.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgChartsModule } from 'ng2-charts';
import { AdminPortalComponent } from './pages/admin/admin-portal/admin-portal.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    TasksComponent,
    LoaderComponent,
    NoAccessComponent,
    AchievementComponent,
    StreaksComponent,
    AddEditTasksComponent,
    AdminPortalComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule ,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    MatDialogModule,
    MatButtonModule, 
    MatCommonModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatSnackBarModule,
    NgChartsModule
    
    // BrowserAnimationsModule, // required animations module
    // ToastrModule.forRoot(), // ToastrModule added
  
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    MatSnackBar, {
      provide: MAT_DIALOG_DATA,
      useValue: {}
    },
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GlobalInterceptor,
      multi: true,
    },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
