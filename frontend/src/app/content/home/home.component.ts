import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { AuthService } from './../../_services/auth.service';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentUser: User;

  constructor(
    private router: Router,
    private authService: AuthService,
  ) { 
    this.authService.currentUser.subscribe(user => this.currentUser = user);
  }

  ngOnInit(): void {
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
