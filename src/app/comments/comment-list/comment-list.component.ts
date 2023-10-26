import { Component, OnInit } from '@angular/core';
import { CommentsService } from 'src/app/services/comments.service';
import { Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css'],
})
export class CommentListComponent implements OnInit {
  @Input() id: string;
  commentList: Array<object>;
  length: number;
  postId: string;

  constructor(
    private commentSrvc: CommentsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (!this.route) {
      this.commentSrvc.loadComments(this.id).subscribe((data) => {
        this.commentList = data;
        this.length = data.length;
      });
    } else{
      this.route.paramMap.subscribe((value) => {
        this.id = value.get('id');
        this.commentSrvc.loadComments(this.id).subscribe((data) => {
          this.commentList = data;
          this.length = data.length;
        });
      });
    }
  }
}
