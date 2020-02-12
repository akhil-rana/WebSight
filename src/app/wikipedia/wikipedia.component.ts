import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-wikipedia",
  templateUrl: "./wikipedia.component.html",
  styleUrls: ["./wikipedia.component.css"]
})
export class WikipediaComponent implements OnInit {
  constructor(private http: HttpClient) {}
  query;
  // contents = [""];
  ngOnInit(): void {
    this.searchResult = { content: [] };
  }
  goBack() {
    window.history.back();
  }
  searchResult;

  send_query() {
    let wikiquery = {
      input: this.query
    };
    this.http
      .post("https://websight-backend.herokuapp.com/wikipedia", wikiquery)
      .subscribe(
        response => {
          this.searchResult = response;

          console.log(this.searchResult);
          // this.resultPass.emit();
          // this.resultPass1.emit();

          return;
        },
        error => {
          console.log("error during post is ", error);
        }
      );
  }
}