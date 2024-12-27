import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],

  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email = new FormControl('', [
    Validators.required,
    Validators.email
  ])
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(6)
  ])
  LoginForm = new FormGroup({
    email: this.email,
    password: this.password
  })


  constructor(private authService: AuthService) { }
  login() {
    this.authService.loginUser(this.LoginForm.value.email!, this.LoginForm.value.password!)

  }
  reset() {
    console.log(this.LoginForm.value);
  }
}
