import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/category';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  apiUrlCategories = environment.apiUrl + 'categories';

  constructor(private http: HttpClient) { }

  // get all posts
  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrlCategories);
  }

  // get single post
  getCategory(categoryId: string): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrlCategories}/${categoryId}`);
  }

  // add a new post
  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.apiUrlCategories, category);
  }

  // update post
  updateCategory(category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.apiUrlCategories}/${category.id}`, category);
  }

  // delete posts
  deleteCategory(categoryId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrlCategories}/${categoryId}`);
  }
}
