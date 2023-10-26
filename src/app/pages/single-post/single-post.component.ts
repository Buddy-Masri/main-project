import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css'],
})
export class SinglePostComponent {
  postId: string;
  postData: any;
  categoryname: string;
  similarPosts: any;


  constructor(
    private params: ActivatedRoute,
    private postSrvc: PostsService
  ) {
    this.params.paramMap.subscribe((params) => {
      this.postId = params.get('id');
      this.postSrvc.updateViews(this.postId)
      this.postSrvc.loadSinglePost(this.postId).subscribe((post) => {
        this.postData = post;
        this.categoryname = this.postData.category.category;
        this.postSrvc.loadSimilarPosts(this.categoryname).subscribe((data) => {
          this.similarPosts = data;
        });
      });
    });
  }
}
