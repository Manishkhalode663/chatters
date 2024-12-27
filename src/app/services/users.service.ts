import { Injectable } from '@angular/core';
import { doc, DocumentData, DocumentReference, Firestore, setDoc, updateDoc, getFirestore, addDoc, collection, getDocs } from 'firebase/firestore';
import { from, Observable, of, switchMap } from 'rxjs';
import { ProfileUser } from '../models/user-profile';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  db: any;
   
  constructor(  private authService: AuthService,private router: Router) {
    this.db = getFirestore();
    

   }

  
  async addUser(user:ProfileUser) {
    const userdata = {
      displayname: user.name,
      Email: user.email,
      photoURL: user.photoURL ? user.photoURL : "/assets/images/user.png",
      firstName: user.firstName? user.firstName : '',
      lastName: user.lastName? user.lastName : '',
      phone: user.phone? user.phone : '',
      address: user.address? user.address : '',
      
    }
    console.log(userdata);
    
    const docRef = await addDoc(collection(this.db, 'users'), {
      ...userdata
      
    });




    
    
  }
  
  async getAllUsers() {
  let result: any[] = [];
  const querySnapshot = await getDocs(collection(this.db, 'users'));
  querySnapshot.forEach((doc) => {
    result.push({ id: doc.id, ...doc.data() });
  });
  return result;
  }
  

  
//   async addUser(user: ProfileUser) {
    
//     try {
//       const docRef = await addDoc(collection(this.db, 'users'), {
//         ...user,
//         uid: this.authService.getUid(),
//       });
      

//  console.log('user added to the database');
 
//       this.router.navigate(['/']);
//     } catch (e) {
//       console.error('Error adding document: ', e);

     
//       // alert('something went wrong while creating snippet');

//     }
//   }


 }

   


  // addUser(user: ProfileUser): Observable<any> {
  //   const ref = doc(this.firestore, 'users', user?.uid);
  //   return of(setDoc(ref, user));
  // }
  // updateUser(user: ProfileUser): Observable<any> {
  //   const ref = doc(this.firestore, 'users', user?.uid);
  //   return from(updateDoc(ref, { ...user }));
  // }






