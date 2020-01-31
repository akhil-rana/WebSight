import { Component, OnInit } from "@angular/core";
import { AppService } from "../../app.service";
@Component({
  selector: "app-weather",
  templateUrl: "./weather.component.html",
  styleUrls: ["./weather.component.css"]
})
export class WeatherComponent implements OnInit {
  constructor(private as: AppService) {}

  ngOnInit() {
    if (this.as.resultRec4 == undefined) {
      this.as.resultRec4 = this.as.resultPass4.subscribe((name: string) => {
        this.cityWeaRec();
      });
    }
  }
  city;
  weather;
  cityWeaPass() {
    this.as.city = this.city;

    this.as.weather();
  }
  cityWeaRec() {
    this.weather = this.as.woutput;
    console.log(this.weather);
  }
}
