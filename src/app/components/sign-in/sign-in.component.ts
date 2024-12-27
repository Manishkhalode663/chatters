import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AbstractControl, FormControl, FormGroup, FormsModule, NgForm, NgModel, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
// import { UsersService } from '../../services/users.service';
import { ProfileUser } from '../../models/user-profile';
import { UsersService } from '../../services/users.service';
// import { UsersService } from '../../services/users.service';

export function matchPasswords(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirm_password = control.get('confirm_password')?.value;
    if (password && confirm_password && password !== confirm_password) {
      return { passdontmatch: true }
    }
    return null;
  }

}

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})

export class SignInComponent {




  constructor(private authService: AuthService, private router: Router,private userService:UsersService) { }



  SignUpForm = new FormGroup({
    name: new FormControl('', [
      Validators.required
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required
    ]),
    confirm_password: new FormControl('', [
      Validators.required
    ])
  }, { validators: matchPasswords() })

  get name() {
    return this.SignUpForm.get('name');
  }
  get email() {
    return this.SignUpForm.get('email');
  }
  get password() {
    return this.SignUpForm.get('password');
  }
  get confirm_password() {
    return this.SignUpForm.get('confirm_password');
  }

  ngOnInit(): void {
  }

  async yoyo() {
    
   }


  async submit() {
    if (!this.SignUpForm.valid) return;


    const { name, email, password } = this.SignUpForm.value;
    if (name && email && password) {
      try {
         this.authService.createUser(name,email, password).then((user) => { 
            this.userService.addUser(this.SignUpForm.value as ProfileUser);
           console.log(user, "is added to the database");
          
        });


        this.router.navigate(['/login']);

        alert('User Created Successfully');
      } catch (error) {
        // Handle error (e.g., display an error message to the user)
        console.error(error);
        alert('User Creation Failed');
      }

    }

  }
}