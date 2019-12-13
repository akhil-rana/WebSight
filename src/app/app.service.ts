import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: "root"
})
export class AppService {
  constructor(private http: HttpClient) {}
  speechInput;
  searchResult;
  gSearch() {
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
          console.log(this.searchResult);
          // var link = this.searchResult.link;
          // var win = window.open(link, "_blank");
          // win.focus();
        },
        error => {
          console.log("error during post is ", error);
        }
      );
  }
}
