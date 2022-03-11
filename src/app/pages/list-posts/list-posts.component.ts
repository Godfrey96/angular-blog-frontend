import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { Category } from 'src/app/models/category';
import { Post } from 'src/app/models/post';
import { User } from 'src/app/models/user';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { PostsService } from 'src/app/services/posts.service';
import { UsersService } from 'src/app/services/users/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-posts',
  templateUrl: './list-posts.component.html',
  styleUrls: ['./list-posts.component.css']
})
export class ListPostsComponent implements OnInit, OnDestroy {

  posts: Post[] = [];
  categories: Category[] = [];
  users: User[] = [];
  isCategoryPage!: boolean;
  endsub$: Subject<any> = new Subject();
  // categoryId

  constructor(
    private postsService: PostsService,
    private categoriesService: CategoriesService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      params['categoryId'] ? this._getAllPosts([params['categoryId']]) : this._getAllPosts();
      params['categoryid'] ? (this.isCategoryPage = true) : (this.isCategoryPage = false);
    })
    // this._getAllPosts();
    this._getAllCategories();
    // this.primengConfig.ripple = true;
  }

  private _getAllPosts(categoriesFilter?: any[]) {
    this.postsService.getAllPosts(categoriesFilter).pipe(takeUntil(this.endsub$)).subscribe((posts) => {
      this.posts = posts;
      console.log('posts: ', posts);
    });
  }

  private _getAllCategories() {
    this.categoriesService.getAllCategories().pipe(takeUntil(this.endsub$)).subscribe((categories) => {
      this.categories = categories;
      console.log('categories: ', categories);
    });
  }

  // categoryFilter() {
  //   const selectedCategories = this.categories.filter(category => category.checked).map(category => category.id);

  //   this._getAllPosts(selectedCategories);
  // }

  ngOnDestroy() {
    this.endsub$.next(1);
    this.endsub$.complete()
  }

}
