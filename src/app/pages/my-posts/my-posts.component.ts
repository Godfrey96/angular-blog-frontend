import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Post } from 'src/app/models/post';
import { AuthService } from 'src/app/services/auth/auth.service';
import { PostsService } from 'src/app/services/posts.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class MyPostsComponent implements OnInit, OnDestroy {

  user: any;
  myPosts: Post[] = [];
  endSub$: Subject<any> = new Subject();

  constructor(
    private router: Router,
    private postsService: PostsService,
    private authService: AuthService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.user = this.authService.userValue.username;
    console.log('username: ', this.user)
    this._getMyPosts();
  }

  private _getMyPosts() {
    this.postsService.getUserPosts(this.user).pipe(
      takeUntil(this.endSub$)).subscribe((posts) => {
        this.myPosts = posts;
        console.log('my-posts: ', posts);
      })

  }

  deletePost(postId: string) {
    // this.confirmationService.confirm({
    //   message: 'Do you want to Delete this Post?',
    //   header: 'Delete Post',
    //   icon: 'pi pi-exclamation-triangle',
    //   accept: () => {
    //     this.postsService.deletePost(postId).subscribe((response) => {
    //       this._getMyPosts();
    //       this.messageService.add({
    //         severity: 'success',
    //         summary: 'Success',
    //         detail: 'Post is deleted'
    //       });
    //     },
    //       (error) => {
    //         this.messageService.add({
    //           severity: 'error',
    //           summary: 'Error',
    //           detail: 'Post is not deleted'
    //         });
    //       });
    //   },
    // });

    this.postsService.deletePost(postId).subscribe((res) => {
      this._getMyPosts();
      console.log('post deleted: ', res);
    })
  }

  updatePost(postId: any) {
    console.log('postid: ', postId)
    this.router.navigateByUrl(`edit-post/${postId}`);
  }

  ngOnDestroy() {
    // this.endSub$.next();
    // this.endSub$.complete();
  }

}
