import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { UsersService } from '../../../services/users.service';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})


export class LoginComponent {

  usersService = inject(UsersService);
  router = inject(Router)

  formulario = new FormGroup({
    email: new FormControl(),
    password: new FormControl()
  });

  async onSubmit() {
    const response = await this.usersService.login(this.formulario.value);
    console.log("Hola")

    if(!response.error){
      console.log(response)
      localStorage.setItem(`access_refresh`, response.accessToken);
      localStorage.setItem(`refresh_token`, response.refreshToken);
      this.router.navigate(['/songs']);
    }
    
  }

}
