import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Category } from 'src/app/models/category';
import { Post } from 'src/app/models/post';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { PostsService } from 'src/app/services/posts.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-view-posts-by-category',
  templateUrl: './view-posts-by-category.component.html',
  styleUrls: ['./view-posts-by-category.component.css']
})
export class ViewPostsByCategoryComponent implements OnInit, OnDestroy {

  searchCategory!: any;
  posts: any;
  categories: Category[] = [];
  singleCategory: any;
  endsub$: Subject<any> = new Subject();

  constructor(
    private activatedRoute: ActivatedRoute,
    private postsService: PostsService,
    private categoriesService: CategoriesService,
    private location: Location,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((data) => {
      if (data['id']) {
        this.searchCategory = data['id'];
        console.log('search-category: ', this.searchCategory)
        this._getCategory(this.searchCategory);
      }

      this.postsService.getPostsByCategory(this.searchCategory).pipe(takeUntil(this.endsub$)).subscribe(categoryData => {
        this.posts = categoryData;
        console.log('post-category: ', categoryData)
      })
    });


    this._getAllCategories();
  }

  private _getCategory(id: string) {
    this.categoriesService.getCategory(id).subscribe((category) => {
      this.singleCategory = category;
    });
  }

  private _getAllCategories() {
    this.categoriesService.getAllCategories().pipe(takeUntil(this.endsub$)).subscribe((categories) => {
      this.categories = categories;
      console.log('categories: ', categories);
    });
  }

  onBack() {
    this.location.back();
  }

  ngOnDestroy() {
    this.endsub$.next(1);
    this.endsub$.complete()
  }

}
