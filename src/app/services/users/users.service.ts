import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  apiURLUsers = environment.apiUrl + 'users';

  constructor(
    private http: HttpClient
  ) { }

  // get all users
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiURLUsers);
  }

  // get single user
  getUser(userId: string): Observable<User> {
    return this.http.get<User>(`${this.apiURLUsers}/${userId}`);
  }

  // update user
  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiURLUsers}/${user._id}`, user);
  }

  // delete user
  deleteUser(userId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiURLUsers}/${userId}`);
  }

}
