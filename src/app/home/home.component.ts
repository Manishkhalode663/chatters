import { Component, NgModule } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  
  
  user: any;
   allUsers: { id: string, displayname: string, photoURL: string }[] = []

  constructor(private authservice: AuthService,private userService:UsersService) { 
    
    this.user = this.authservice.getUser();
     userService.getAllUsers().then((data) => { 
       this.allUsers = data;
       console.log(data);
       
    });
    console.table(this.allUsers);   
    
  }


   
}
