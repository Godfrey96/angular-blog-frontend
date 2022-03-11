import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

// import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'BLOG';
  spinnerType?: string;
  spinnerName?: string;

  constructor(
    private spinner: NgxSpinnerService
  ) {
    // firebase.initializeApp(environment.firebaseConfig);

    this.spinnerName = 'sp1';
    this.spinnerType = 'ball-clip-rotate-multiple';

    /** spinner starts on init */
    this.spinner.show(this.spinnerName);

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide(this.spinnerName);
    }, 5000);
  }

}
