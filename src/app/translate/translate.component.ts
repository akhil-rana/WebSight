import { Component, OnInit } from "@angular/core";
import { AppService } from "../app.service";

@Component({
  selector: "app-translate",
  templateUrl: "./translate.component.html",
  styleUrls: ["./translate.component.css"]
})
export class TranslateComponent implements OnInit {
  constructor(private as: AppService) {}

  ngOnInit() {
    this.as.LangCode = this.LangCode;
    this.as.LangNames = this.LangNames;

    if (this.as.resultRec3 == undefined) {
      this.as.resultRec3 = this.as.resultPass3.subscribe((name: string) => {
        this.setResult();
      });
    }
  }
  lang = "English";
  query;
  selectedOutputLang = "English";
  Object = Object;
  sendQuery() {
    this.as.query = this.query;

    this.as.sendQuery(
      this.LangCode[this.LangNames.indexOf(this.selectedOutputLang)]
    );
  }
  setResult() {
    var result = this.as.output.out;
    // console.log(result);
    (<HTMLInputElement>document.getElementById("output")).value = result;
    var utterThis = new SpeechSynthesisUtterance(result);
    utterThis.lang = this.LangCode[
      this.LangNames.indexOf(this.selectedOutputLang)
    ];
    // console.log(speechSynthesis.getVoices());
    speechSynthesis.speak(utterThis);
  }

  langs = {
    af: "Afrikaans",
    sq: "Albanian",
    am: "Amharic",
    ar: "Arabic",
    hy: "Armenian",
    az: "Azerbaijani",
    eu: "Basque",
    be: "Belarusian",
    bn: "Bengali",
    bs: "Bosnian",
    bg: "Bulgarian",
    ca: "Catalan",
    ceb: "Cebuano",
    ny: "Chichewa",
    "zh-CN": "Chinese (Simplified)",
    "zh-TW": "Chinese (Traditional)",
    co: "Corsican",
    hr: "Croatian",
    cs: "Czech",
    da: "Danish",
    nl: "Dutch",
    en: "English",
    eo: "Esperanto",
    et: "Estonian",
    tl: "Filipino",
    fi: "Finnish",
    fr: "French",
    fy: "Frisian",
    gl: "Galician",
    ka: "Georgian",
    de: "German",
    el: "Greek",
    gu: "Gujarati",
    ht: "Haitian Creole",
    ha: "Hausa",
    haw: "Hawaiian",
    he: "Hebrew",
    iw: "Hebrew",
    hi: "Hindi",
    hmn: "Hmong",
    hu: "Hungarian",
    is: "Icelandic",
    ig: "Igbo",
    id: "Indonesian",
    ga: "Irish",
    it: "Italian",
    ja: "Japanese",
    jw: "Javanese",
    kn: "Kannada",
    kk: "Kazakh",
    km: "Khmer",
    ko: "Korean",
    ku: "Kurdish (Kurmanji)",
    ky: "Kyrgyz",
    lo: "Lao",
    la: "Latin",
    lv: "Latvian",
    lt: "Lithuanian",
    lb: "Luxembourgish",
    mk: "Macedonian",
    mg: "Malagasy",
    ms: "Malay",
    ml: "Malayalam",
    mt: "Maltese",
    mi: "Maori",
    mr: "Marathi",
    mn: "Mongolian",
    my: "Myanmar (Burmese)",
    ne: "Nepali",
    no: "Norwegian",
    ps: "Pashto",
    fa: "Persian",
    pl: "Polish",
    pt: "Portuguese",
    pa: "Punjabi",
    ro: "Romanian",
    ru: "Russian",
    sm: "Samoan",
    gd: "Scots Gaelic",
    sr: "Serbian",
    st: "Sesotho",
    sn: "Shona",
    sd: "Sindhi",
    si: "Sinhala",
    sk: "Slovak",
    sl: "Slovenian",
    so: "Somali",
    es: "Spanish",
    su: "Sundanese",
    sw: "Swahili",
    sv: "Swedish",
    tg: "Tajik",
    ta: "Tamil",
    te: "Telugu",
    th: "Thai",
    tr: "Turkish",
    uk: "Ukrainian",
    ur: "Urdu",
    uz: "Uzbek",
    vi: "Vietnamese",
    cy: "Welsh",
    xh: "Xhosa",
    yi: "Yiddish",
    yo: "Yoruba",
    zu: "Zulu"
  };

  LangCode = Object.keys(this.langs);
  LangNames = Object.values(this.langs);
}
