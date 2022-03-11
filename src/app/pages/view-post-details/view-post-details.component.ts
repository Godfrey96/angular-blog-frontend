import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/models/post';
import { PostsService } from 'src/app/services/posts.service';
import { Location } from '@angular/common';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-view-post-details',
  templateUrl: './view-post-details.component.html',
  styleUrls: ['./view-post-details.component.css']
})
export class ViewPostDetailsComponent implements OnInit {

  postId: any;
  post!: Post;
  user: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private postsService: PostsService,
    private authService: AuthService,
    private router: Router,
    private location: Location,
  ) { }

  ngOnInit(): void {
    this.user = this.authService.userValue;

    this.activatedRoute.params.subscribe((data) => {
      if (data['id']) {
        this.postId = data['id'];
        console.log('postId: ', this.postId);
        this._getPost(this.postId);
      }
    })
  }

  private _getPost(id: string) {
    this.postsService.getPost(id).subscribe((post) => {
      this.post = post;
    });
  }

  onBack() {
    this.location.back();
  }

  editPost(postId: any) {
    console.log('edit post')
    console.log('postid: ', postId)
    this.router.navigateByUrl(`edit-post/${postId}`);
  }

}
