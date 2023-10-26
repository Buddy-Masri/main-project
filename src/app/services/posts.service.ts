import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
import * as firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private afs: AngularFirestore) {}

  loadFeaturedPosts() {
    return this.afs
      .collection('posts', (ref) =>
        ref.where('isFeatured', '==', true).orderBy('createdAt').limit(4)
      )
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

  loadlatestPosts() {
    return this.afs
      .collection('posts', (ref) => ref.orderBy('createdAt').limit(9))
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

  loadSinglePost(id: string) {
    return this.afs.collection('posts').doc(id).valueChanges();
  }

  loadSimilarPosts(categoryName: string) {
    return this.afs
      .collection('posts', (ref) =>
        ref.where('category.category', '==', categoryName).limit(4)
      )
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

  updateViews(id) {
    const viewsCount = {
      views: firebase.default.firestore.FieldValue.increment(1),
    };
    this.afs.collection('posts').doc(id).update(viewsCount);
  }
}
