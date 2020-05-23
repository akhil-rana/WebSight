import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import * as $ from "jquery";

@Component({
  selector: "app-yt-player",
  templateUrl: "./yt-player.component.html",
  styleUrls: ["./yt-player.component.css"],
})
export class YtPlayerComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}
  videoID;
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.videoID = params.get("id");
      console.log(this.videoID);
    });
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);
  }
  goBack() {
    window.history.back();
  }
}
