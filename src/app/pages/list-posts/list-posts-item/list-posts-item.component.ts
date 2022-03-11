import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';

@Component({
  selector: 'app-list-posts-item',
  templateUrl: './list-posts-item.component.html',
  styleUrls: ['./list-posts-item.component.css']
})
export class ListPostsItemComponent implements OnInit {

  @Input() post!: Post;

  constructor() { }

  ngOnInit(): void {
  }

}
