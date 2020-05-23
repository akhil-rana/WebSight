import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { YouTubePlayerModule } from "@angular/youtube-player";

@Component({
  selector: "app-youtube",
  templateUrl: "./youtube.component.html",
  styleUrls: ["./youtube.component.css"],
})
export class YoutubeComponent implements OnInit {
  constructor(private http: HttpClient) {}
  query = "";
  flag1 = 1;
  flag2 = 0;
  result;
  ngOnInit(): void {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);
  }
  goBack() {
    window.history.back();
  }
  send_query() {
    this.flag1 = 0;
    this.flag2 = 0;

    if (this.query != "") {
      let youtubequery = {
        input: this.query,
      };
      // this.flag = 0;

      this.http
        .post("https://websight-backend.herokuapp.com/youtube", youtubequery)
        // .post("http://localhost:8080/youtube", youtubequery)

        .subscribe(
          (response) => {
            // this.searchResult = response;
            // this.flag = 1;
            // this.flag2 = 1;
            this.result = Object.values(response);
            console.log(this.result);
            // this.resultPass.emit();
            // this.resultPass1.emit();
            this.flag1 = 1;
            this.flag2 = 1;

            return;
          },
          (error) => {
            console.log("error during post is ", error);
          }
        );
    }
  }
}
