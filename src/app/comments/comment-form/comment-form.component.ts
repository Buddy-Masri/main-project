import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Comments } from 'src/app/models/comments';
import { CommentsService } from 'src/app/services/comments.service';
import { ActivatedRoute } from '@angular/router';
import { Input } from '@angular/core';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css'],
})
export class CommentFormComponent implements OnInit {
  @Input() id: string;
  comment: Comments;

  constructor(private commentSrvc: CommentsService) {}

  ngOnInit(): void {
  }

  onSubmit(form: FormGroup) {
    this.comment = {
      name: form.value.name,
      comment: form.value.comment,
      date: new Date(),
      id: this.id
    };
    this.commentSrvc.commentSubmit(this.comment);
    form.reset();
  }
}
