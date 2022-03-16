import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { Post } from 'src/app/models/post';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { PostsService } from 'src/app/services/posts.service';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';
import { MessageService } from 'primeng/api';
import { finalize, timer } from 'rxjs';
import firebase from 'firebase/compat/app';
import 'firebase/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
  providers: [MessageService]
})
export class CreatePostComponent implements OnInit {

  form!: FormGroup;
  apiUrlPosts = environment.apiUrl + 'posts';
  isSubmitted = false;
  categories: Category[] = [];
  imageDisplay: any;
  photoFileName: any;
  photoFilePath: any;
  editmode = false;
  currentPostId!: string;
  user: any;

  title: any;
  category: any;
  description: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private categoriesService: CategoriesService,
    private postsService: PostsService,
    private authServce: AuthService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private messageService: MessageService,
    private afStorage: AngularFireStorage,
  ) { }

  ngOnInit(): void {
    this.user = this.authServce.userValue.username;
    console.log('user-log: ', this.user)
    // this.getCurrentLoggedInUser();
    this._initForm();
    this._getCategories();
    this._checkEditMode();
  }

  // getCurrentLoggedInUser() {
  //   const user = this.authServce.userValue;
  //   console.log('user-loggedin: ', user);
  // }

  private _initForm() {
    this.form = this.fb.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required]
    });
  }

  private _getCategories() {
    this.categoriesService.getAllCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  private _checkEditMode() {
    this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        this.editmode = true;
        this.currentPostId = params['id'];
        this.postsService.getPost(params['id']).subscribe((post) => {
          this.postForm['title'].setValue(post.title);
          this.postForm['category'].setValue(post.category?.id);
          this.postForm['description'].setValue(post.description);
          this.imageDisplay = post.image;
          this.postForm['image'].setValidators([]);
          this.postForm['image'].updateValueAndValidity();
        })
      }
    })
  }

  // cancel btn
  onCancle() {
    this.location.back();
  }

  onImageUpload(event: any) {
    console.log(event);
    const files = event.target.files;
    if (files.length === 0) return;
    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) === null) return;
    const file = files[0];
    const filePath = 'blog/' + Date.now() + '_' + file.name;
    const fileRef = this.afStorage.ref(filePath);
    const task = this.afStorage.upload(filePath, file);
    task.snapshotChanges().pipe(
      finalize(() => {
        const downloadUrl = fileRef.getDownloadURL();
        downloadUrl.subscribe((url: any) => {
          console.log('url: ', url);
          if (url) {
            this.imageDisplay = url;
          }
        });
      })
    ).subscribe(url => {
      console.log('data: ', url);
    });
  }

  // onImageUpload(event: any) {
  //   console.log(event);
  //   const file = event.target.files[0];

  //   if (file) {
  //     this.form.patchValue({ image: file });
  //     this.form.get('image')?.updateValueAndValidity();
  //     const fileReader = new FileReader();
  //     fileReader.onload = () => {
  //       this.imageDisplay = fileReader.result as string
  //       // console.log('image: ', this.imageDisplay)
  //     }
  //     fileReader.readAsDataURL(file);
  //   }
  // }

  // add new post
  private _addPost(post: Post) {
    this.postsService.createPost(post).subscribe((post: Post) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: `Post ${post.title} is added`
      });
      timer(2000).toPromise().then(() => {
        this.location.back();
      },
        () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: `Post ${post.title} is not added`
          });
        })
    })
  }

  // update post
  private _updatePost(post: Post) {
    this.postsService.updatePost(post, this.currentPostId).subscribe(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: `Post is updated`
      });
      timer(2000).toPromise().then(() => {
        this.location.back();
      },
        () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: `Post is not not updated`
          });
        })
    })
  }

  // errors
  get postForm() {
    return this.form.controls;
  }

  onSubmit() {
    this.isSubmitted = true;
    // if (this.form.invalid) return;

    // const postFormData = new FormData();

    // postFormData.append('title', this.postForm['title'].value);
    // postFormData.append('description', this.postForm['description'].value);
    // postFormData.append('category', this.postForm['category'].value);
    // postFormData.append('image', this.postForm['image'].value);
    // postFormData.append('username', this.user);

    // Object.keys(this.postForm).map((key) => {
    //   postFormData.append(key, this.postForm[key].value);
    //   // postFormData.append('user', this.user);
    // });

    const post: Post = {
      id: this.currentPostId,
      title: this.postForm['title'].value,
      description: this.postForm['description'].value,
      image: this.imageDisplay,
      category: this.postForm['category'].value,
      username: this.user,
    }

    console.log('post: ', post);


    if (this.editmode) {
      this._updatePost(post);
    } else {
      this._addPost(post);
    }

  }

}
