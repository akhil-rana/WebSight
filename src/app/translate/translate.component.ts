import { Component, OnInit, ɵɵcontainerRefreshEnd } from "@angular/core";
import { AppService } from "../app.service";
declare var webkitSpeechGrammarList: any;
declare var webkitSpeechRecognition: any;

@Component({
  selector: "app-translate",
  templateUrl: "./translate.component.html",
  styleUrls: ["./translate.component.css"]
})
export class TranslateComponent implements OnInit {
  constructor(private as: AppService) {}

  ngOnInit() {
    this.onPageOpen();
    // this.selectedInputLang = this.voiceCommand;
    // console.log(this.LangNames);
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
  selectedOutputLang = ["English"];

  selectedInputLang = ["Any"];

  // voiceCommand = "Automatic";
  Object = Object;
  sendQuery() {
    this.as.query = (<HTMLInputElement>document.getElementById("text1")).value;

    this.as.sendQuery(
      this.LangCode[this.LangNames.indexOf(this.selectedOutputLang[0])]
    );
  }
  setResult() {
    var result = this.as.output.out;
    // console.log(result);
    (<HTMLInputElement>document.getElementById("output")).value = result;
    var utterThis = new SpeechSynthesisUtterance(result);
    utterThis.lang = this.LangCode[
      this.LangNames.indexOf(this.selectedOutputLang[0])
    ];
    // console.log(speechSynthesis.getVoices());
    speechSynthesis.speak(utterThis);
  }

  langs = {
    auto: "Any",
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
    "zh-CN": "Chinese simplified",
    "zh-TW": "Chinese traditional",
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
    ku: "Kurdish ",
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
    my: "Burmese",
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

  LangNames = Object.values(this.langs);
  LangCode = Object.keys(this.langs);

  voiceInputLang() {
    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
    var LangNames = this.LangNames;
    var LangCode = this.LangCode;

    var grammar = "#JSGF V1.0;";
    var recognition = new SpeechRecognition();

    var selectedInputLang = this.selectedInputLang;
    var selectedOutputLang = this.selectedOutputLang;
    var speechRecognitionList = new SpeechGrammarList();
    speechRecognitionList.addFromString(grammar, 1);
    recognition.grammars = speechRecognitionList;
    recognition.continuous = false;
    recognition.lang = "en-IN";
    recognition.interimResults = false;

    recognition.onresult = function(event) {
      var last = event.results.length - 1;
      var command = event.results[last][0].transcript;
      // message.textContent = "Voice Input: " + command + ".";

      if (LangNames.includes(command)) {
        selectedInputLang[0] = command;
        (<HTMLInputElement>document.getElementById("text1")).focus();
      } else {
        selectedInputLang[0] = "Any";
        (<HTMLInputElement>document.getElementById("text1")).focus();
      }
      console.log(command);

      // (<HTMLInputElement>document.getElementById("langInput")).innerHTML =
      //   "Input Language: " + this.selectedInputLang;

      // this.ngOnInit();
      // refreshCom();
      // gSearch;
    };

    recognition.onspeechend = function() {
      recognition.stop();
    };
    recognition.onaudiostart = function() {
      // console.log("sound");
      var sound = new Audio();
      sound.src = "assets/sounds/didong.mp3";
      sound.play();
    };

    recognition.onerror = function(event) {
      console.log("Error occurred in recognition: " + event.error);
    };

    recognition.start();
  }

  voiceInputSpeech() {
    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
    var as = this.as;
    var query = this.query;
    var LangNames = this.LangNames;
    var LangCode = this.LangCode;

    var grammar = "#JSGF V1.0;";
    var recognition = new SpeechRecognition();
    var selectedInputLang = this.selectedInputLang;
    var selectedOutputLang = this.selectedOutputLang;
    var speechRecognitionList = new SpeechGrammarList();

    speechRecognitionList.addFromString(grammar, 1);
    recognition.grammars = speechRecognitionList;
    recognition.continuous = false;
    recognition.lang = this.LangCode[
      this.LangNames.indexOf(this.selectedInputLang[0])
    ];
    recognition.interimResults = false;

    recognition.onresult = function(event) {
      var last = event.results.length - 1;
      var command = event.results[last][0].transcript;
      // message.textContent = "Voice Input: " + command + ".";

      console.log(command);
      (<HTMLInputElement>document.getElementById("text1")).focus();

      (<HTMLInputElement>document.getElementById("text1")).value = command;
      as.query = (<HTMLInputElement>document.getElementById("text1")).value;

      as.sendQuery(LangCode[LangNames.indexOf(selectedOutputLang[0])]);
      //   "Input Language: " + this.selectedInputLang;

      // this.ngOnInit();
      // refreshCom();
      // gSearch;
    };

    recognition.onspeechend = function() {
      recognition.stop();
    };
    recognition.onaudiostart = function() {
      // console.log("sound");
      var sound = new Audio();
      sound.src = "assets/sounds/didong.mp3";
      sound.play();
    };

    recognition.onerror = function(event) {
      console.log("Error occurred in recognition: " + event.error);
    };

    recognition.start();
  }

  voiceOutputLang() {
    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
    var LangNames = this.LangNames;
    var LangCode = this.LangCode;

    var grammar = "#JSGF V1.0;";
    var recognition = new SpeechRecognition();

    var selectedInputLang = this.selectedInputLang;
    var selectedOutputLang = this.selectedOutputLang;
    var speechRecognitionList = new SpeechGrammarList();
    speechRecognitionList.addFromString(grammar, 1);
    recognition.grammars = speechRecognitionList;
    recognition.continuous = false;
    recognition.lang = "en-IN";
    recognition.interimResults = false;

    recognition.onresult = function(event) {
      var last = event.results.length - 1;
      var command = event.results[last][0].transcript;
      // message.textContent = "Voice Input: " + command + ".";

      if (LangNames.includes(command)) {
        selectedOutputLang[0] = command;
        (<HTMLInputElement>document.getElementById("outputSelect")).focus();
      } else {
        // selectedOutputLang[0] = "";
        (<HTMLInputElement>document.getElementById("outputSelect")).focus();
      }
      console.log(command);

      // (<HTMLInputElement>document.getElementById("langInput")).innerHTML =
      //   "Input Language: " + this.selectedInputLang;

      // this.ngOnInit();
      // refreshCom();
      // gSearch;
    };

    recognition.onspeechend = function() {
      recognition.stop();
    };
    recognition.onaudiostart = function() {
      // console.log("sound");
      var sound = new Audio();
      sound.src = "assets/sounds/didong.mp3";
      sound.play();
    };

    recognition.onerror = function(event) {
      console.log("Error occurred in recognition: " + event.error);
    };

    recognition.start();
  }

  onPageOpen() {
    var synth = window.speechSynthesis;

    var utterance1 = new SpeechSynthesisUtterance(
      "Hello user, Welcome to google translate!, please tell me which language do you want to translate?"
    );
    var voiceInputLang = this.voiceInputLang;
    synth.speak(utterance1);
    var s = setInterval(function() {
      if (!synth.speaking) {
        clearInterval(s);
        voiceInputLang();
      }
    }, 1000);
  }
}
