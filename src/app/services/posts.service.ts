import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Post } from '../models/post';
import { Observable } from 'rxjs';
import { getDownloadURL, ref, Storage, uploadBytes } from '@angular/fire/storage';
import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class PostsService {

  apiUrlPosts = environment.apiUrl + 'posts';
  apiUrlPhoto = environment.apiUrl + 'uploads';
  storage!: Storage;
  user: any;

  constructor(
    private http: HttpClient,
    // private storage: Storage
  ) { }

  // get all posts
  getAllPosts(categoriesFilter?: any[]): Observable<Post[]> {
    let params = new HttpParams();
    if (categoriesFilter) {
      params = params.append('categories', categoriesFilter.join(','));
    }
    return this.http.get<Post[]>(this.apiUrlPosts, { params: params })
  }

  // get single post
  getPost(postId: string): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrlPosts}/${postId}`);
  }

  // add a new post
  createPost(postData: FormData): Observable<Post> {
    return this.http.post<Post>(this.apiUrlPosts, postData);
  }

  // upload image to firebase storage
  async uploadImage(file: any, filePath: any) {
    try {
      const fileRef = ref(this.storage, filePath);
      const task = await uploadBytes(fileRef, file);
      const url = getDownloadURL(fileRef);
      return url;
    } catch (e) {
      throw (e);
    }
  }

  UploadPhoto(val: any) {
    return this.http.post(this.apiUrlPhoto, val);
  }

  // update post
  updatePost(postData: FormData, postId: string): Observable<Post> {
    return this.http.put<Post>(`${this.apiUrlPosts}/${postId}`, postData);
  }

  // delete posts
  deletePost(postId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrlPosts}/${postId}`);
  }

  // get user posts
  getUserPosts(username: any, categoriesFilter?: any[]): Observable<Post[]> {
    let params = new HttpParams();
    if (categoriesFilter) {
      params = params.append('categories', categoriesFilter.join(','));
    }
    return this.http.get<Post[]>(`${this.apiUrlPosts}/get/myposts/${username}`, { params: params });
  }

  // get posts by category
  getPostsByCategory(categoryId: any): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrlPosts}/get/posts-by-category/${categoryId}`);
  }

}
