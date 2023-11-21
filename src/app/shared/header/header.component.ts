import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  collapsed = false;
  name: any;
  tier: any;
  pointsBalance: any;
  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }

  constructor(public _auth: AuthService) {}

  ngOnInit(): void {}

  logout() {
    this._auth.logout();
  }
}
