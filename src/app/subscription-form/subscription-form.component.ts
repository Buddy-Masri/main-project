import { Component } from '@angular/core';
import { Subscribers } from '../models/subscribers.model';
import { SubscribersService } from '../services/subscribers.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-subscription-form',
  templateUrl: './subscription-form.component.html',
  styleUrls: ['./subscription-form.component.css'],
})
export class SubscriptionFormComponent {
  Subscriber: Subscribers;

  constructor(
    private newSub: SubscribersService,
    private toastr: ToastrService
  ) {}

  onSubmit(form) {
    this.newSub.checkMail(form.value.email).subscribe((val) => {
      if (!val.empty) {
        this.toastr.warning('Email Already In Use');
        form.reset();
      } else {
        this.Subscriber = {
          name: form.value.name,
          email: form.value.email,
        };
        this.newSub.newSubscriber(this.Subscriber);
        form.reset();
      }
    });
  }
}
