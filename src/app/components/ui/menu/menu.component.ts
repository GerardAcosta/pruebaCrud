import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UsersService } from '../../../services/users.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterModule, NgIf],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  router = inject(Router);
  usersService = inject(UsersService);

  onClickLogout(){
    localStorage.removeItem('access_refresh');
    localStorage.removeItem('refresh_token');
    this.router.navigate(['/login']);
  }
}
