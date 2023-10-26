import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { Subscribers } from '../models/subscribers.model';

@Injectable({
  providedIn: 'root',
})
export class SubscribersService {
  constructor(private afs: AngularFirestore, private toastr: ToastrService) {}

  newSubscriber(data: Subscribers) {
    this.afs
      .collection('subscribers')
      .add(data)
      .then((ref) => {
        console.log(ref);

        this.toastr.success('Your Subscription Was Successful');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  checkMail(mail: string) {
    return this.afs
      .collection('subscribers', (ref) => ref.where('email', '==', mail))
      .get();
  }
}
