import { Component } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  featuredPosts: Array<object>;
  latestPosts: Array<object>;

  constructor(private postSrvc: PostsService) {
    this.postSrvc.loadFeaturedPosts().subscribe((posts) => {
      this.featuredPosts = posts;
    });
    this.postSrvc.loadlatestPosts().subscribe((posts) => {
      this.latestPosts = posts;
    });
  }
}
