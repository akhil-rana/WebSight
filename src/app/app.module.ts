import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { SpeechComponent } from "./speech/speech.component";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { SearchInputComponent } from "./speech/search-input/search-input.component";
import { SearchResultsComponent } from "./speech/search-results/search-results.component";
import { MatListModule } from "@angular/material/list";
import { MatCardModule } from "@angular/material/card";
import { MatDividerModule } from "@angular/material/divider";
import { MainPComponent } from "./main-p/main-p.component";
import { FeaturesComponent } from "./main-p/features/features.component";
import { SigninupComponent } from "./main-p/signinup/signinup.component";
import { TranslateComponent } from "./translate/translate.component";
import { YouTubePlayerModule } from "@angular/youtube-player";
import { MatSelectModule } from "@angular/material/select";
import { NewsComponent } from "./news/news.component";
import { WeatherComponent } from "./news/weather/weather.component";
import { InshortsHeadlinesComponent } from "./news/inshorts-headlines/inshorts-headlines.component";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { WikipediaComponent } from "./wikipedia/wikipedia.component";
import { SearchComponent } from "./news/search/search.component";
import { NewsNavbarComponent } from "./news/news-navbar/news-navbar.component";
import { ScrollingModule } from "@angular/cdk/scrolling";
//import { CompControlComponent } from './news/comp-control/comp-control.component';
import { YoutubeComponent } from './youtube/youtube.component';
import { YtPlayerComponent } from './youtube/yt-player/yt-player.component';


@NgModule({
  declarations: [
    AppComponent,
    SpeechComponent,
    SearchInputComponent,
    SearchResultsComponent,
    MainPComponent,
    FeaturesComponent,
    SigninupComponent,
    TranslateComponent,
    NewsComponent,
    WeatherComponent,
    InshortsHeadlinesComponent,
    WikipediaComponent,
    SearchComponent,
    NewsNavbarComponent,
    // CompControlComponent
    YoutubeComponent,
    YtPlayerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    FormsModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatCardModule,
    MatDividerModule,
    MatSelectModule,
    YouTubePlayerModule,
    MatProgressBarModule,
    ScrollingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
