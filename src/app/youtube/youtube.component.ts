import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-youtube",
  templateUrl: "./youtube.component.html",
  styleUrls: ["./youtube.component.css"],
})
export class YoutubeComponent implements OnInit {
  constructor(private http: HttpClient) {}
  query;
  ngOnInit(): void {}
  goBack() {
    window.history.back();
  }
  send_query() {
    let youtubequery = {
      input: this.query,
    };
    // this.flag = 0;

    this.http
      .post("https://websight-backend.herokuapp.com/youtube", youtubequery)
      .subscribe(
        (response) => {
          // this.searchResult = response;
          // this.flag = 1;
          // this.flag2 = 1;
          console.log(response);
          // this.resultPass.emit();
          // this.resultPass1.emit();

          return;
        },
        (error) => {
          console.log("error during post is ", error);
        }
      );
  }
}
