import { Component, OnInit, OnDestroy, ErrorHandler } from '@angular/core';

import { interval, Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private subscriptionRef: Subscription;
  private subscriptionRef_2: Subscription;


  constructor() { }

  ngOnInit() {

    // this.subscriptionRef = interval(1000).subscribe(v => {
    //   console.log(v);
    // })

    const customIntervalObservable = Observable.create((observer) => {
      let count = 0;
      setInterval(() => {
        count++;

        // if (count > 3) {
        //   observer.next(count);
        //   observer.error(new Error("Value greater than 3 !")
        //   );
        // }

        if (count == 10) {
          observer.complete();
        }
        else {
          observer.next(count);
        }

      }, 1000);

    });

    this.subscriptionRef_2 = customIntervalObservable.subscribe(c => {
      console.log(c);
    }, error => {
      console.log("Received error : " + error);
      alert(error);
    },
      () => {
        console.log("Observable finished with emitting values")
      });

  }

  ngOnDestroy() {
    // this.subscriptionRef.unsubscribe();

    if (this.subscriptionRef_2)
      this.subscriptionRef_2.unsubscribe();
  }

}
