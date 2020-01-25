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
import { FeaturesComponent } from './main-p/features/features.component';
import { SigninupComponent } from './main-p/signinup/signinup.component';
import { TranslateComponent } from './translate/translate.component';

@NgModule({
  declarations: [
    AppComponent,
    SpeechComponent,
    SearchInputComponent,
    SearchResultsComponent,
    MainPComponent,
    FeaturesComponent,
    SigninupComponent,
    TranslateComponent
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
    MatDividerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
