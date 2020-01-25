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

  resultPass3 = new EventEmitter();
  resultRec3: Subscription;
  query;
  output;
  LangCode;
  LangNames;
  gSearch() {
    this.loadingPass.emit();

    const speechIn = {
      input: this.speechInput
    };
    this.http
      .post("https://websight-backend.herokuapp.com/google-search", speechIn)
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

  sendQuery(outLang) {
    console.log(outLang);
    const tquery = {
      input: this.query,
      outCode: outLang
    };
    this.http
      .post("http://websight-backend.herokuapp.com/translate", tquery)
      .subscribe(
        response => {
          console.log(response);
          this.output = response;
          this.resultPass3.emit();
        },
        error => {
          console.log("error", error);
        }
      );
  }
}
