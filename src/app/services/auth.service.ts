import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';
import { Observable } from 'rxjs';
import { from } from 'rxjs/internal/observable/from';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { ProfileUser } from '../models/user-profile';
// import { UsersService } from './users.service';
@Injectable({ providedIn: 'root' })

// This service will handle user authentication and provide methods for login, logout, and checking if a user is authenticated.
export class AuthService {


  private uid?: string;
  user?: any;

  getUser() {
    return getAuth().currentUser ? getAuth().currentUser as ProfileUser : null;

  }

  getUid(): any {
    return this.uid;
  }



  // checksnippetuserandCurrentuser(snippetuser: any) {
  //   if (snippetuser == this.getUid()) {
  //     return true
  //   }
  //   return false
  // }


  isAuthenticated() {
    return this.uid ? true : false;
  }

  constructor(private router: Router) {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.uid = user.uid;
        this.user = user;
        console.log('User Logged In as', user.email);
      } else {
        this.uid = undefined;
        console.log(' User Logged out ');
      }
    });
  }


  async createUser(
    username:string,
    email: string,
    password: string,
  ): Promise<any> {
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(userCredential.user, {
        displayName: username,
      });

      console.log('User created successfully:', userCredential.user);
      return userCredential.user as ProfileUser;
      

    } catch (error) {
      console.error('Error creating user:', error);
      throw error; // Re-throw the error for proper handling
    }
  }


  loginUser(email: string, password: string) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // console.log(user);

        this.router.navigate(['/']);
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        alert('something went wrong when logging try again');
      });
  }
  logOutUser() {
    const auth = getAuth();
    signOut(auth).catch((error) => {
      alert('log Out failed');
    });
    this.router.navigate(['/']);
  }

  // getallusers() {
  //   const auth = getAuth();
  //   console.log(auth);
  // }
}