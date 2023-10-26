import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { Comments } from '../models/comments';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  constructor(private afs: AngularFirestore, private toastr: ToastrService) {}

  commentSubmit(data: Comments) {
    this.afs
      .collection('comments')
      .add(data)
      .then((ref) => {
        console.log(ref);

        this.toastr.success('Comment Submitted Successfully');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  loadComments(id: string) {
    return this.afs
      .collection('comments', (ref) => ref.where('id', '==', id))
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, data };
          });
        })
      );
  }
}
