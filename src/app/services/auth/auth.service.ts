import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable, of, ReplaySubject } from 'rxjs';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment.prod';
import { LocalstorageService } from '../localstorage/localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiURLUsers = environment.apiUrl + 'users';
  private currentUserSource: BehaviorSubject<any>;
  public currentUser$!: Observable<User>;

  constructor(
    private http: HttpClient,
    private localStorageService: LocalstorageService,
    private router: Router
  ) {
    this.currentUserSource = new BehaviorSubject<User>(JSON.parse(this.localStorageService.getToken()));
    this.currentUser$ = this.currentUserSource.asObservable();
  }

  public get userValue(): User {
    return this.currentUserSource.value;
  }

  login(email: string, password: string) {
    return this.http.post<User>(`${this.apiURLUsers}/login`, { email, password }).pipe(
      map((user: User) => {
        this.localStorageService.setToken(JSON.stringify(user));
        this.currentUserSource.next(user);
      })
    );
  }

  register(user: User) {
    return this.http.post(this.apiURLUsers, user);
  }

  logout() {
    this.localStorageService.removeToken();
    this.currentUserSource.next(null);
    this.router.navigate(['/']);
  }

}
