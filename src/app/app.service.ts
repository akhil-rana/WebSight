import { Injectable, EventEmitter } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subscription } from "rxjs/internal/Subscription";
@Injectable({
  providedIn: "root"
})
export class AppService {
  constructor(private http: HttpClient) {}
  speechInput;
  searchResult;
  resultPass = new EventEmitter();
  resultRec: Subscription;
  resultPass1 = new EventEmitter();
  resultRec1: Subscription;
  loadingPass = new EventEmitter();
  loadingRec: Subscription;
  gSearch() {
    this.loadingPass.emit();

    const speechIn = {
      input: this.speechInput
    };
    this.http
      .post(
        "https://nodejs-googlesearch-backend.herokuapp.com/postData",
        speechIn
      )
      .subscribe(
        response => {
          this.searchResult = response;

          // console.log(this.searchResult);
          this.resultPass.emit();
          this.resultPass1.emit();

          return;
        },
        error => {
          console.log("error during post is ", error);
        }
      );
  }
}
