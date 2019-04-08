import { MyserviceService } from "./../services/myservice.service";
import { MycrogearService } from "./../services/mycrogear.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
export interface screen {
  w: Number;
  h: Number;
}
@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage implements OnInit, OnDestroy {
  public dataDHT: any;
  public readdataDHT: any;

  public Sw_togle: boolean = false;
  public screenDisplay: screen = {
    w: 0,
    h: 0
  };
  public intercalreadsceen: any = null;
  public thresholdConfig = {
    "0": { color: "green" },
    "40": { color: "orange" },
    "75.5": { color: "red" }
  };

  constructor(
    public fb: AngularFireDatabase,
    public mi: MycrogearService,
    public ser: MyserviceService
  ) {
    this.fb.list("/logs").push({
      Temperature: Math.random() * 100,
      Humadity: Math.random() * 100,
      // Time:`${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear}`

      Time:
        new Date().getHours() +
        ":" +
        new Date().getMinutes() +
        ":" +
        new Date().getSeconds()
    });
    this.intercalreadsceen = setInterval(() => {
      this.screenDisplay = {
        h: screen.availHeight / 2.5,
        w: screen.availWidth / 40
      };
      // console.log(this.screenDisplay);
    }, 100);
  }
  ngOnInit() {
    console.log(this.mi.microgaer());
    this.fb
      .object("/DHT")
      .valueChanges()
      .subscribe((value: any) => {
        //console.log(value);
        this.dataDHT = value;
      });
    this.fb
      .object("/sw_1")
      .valueChanges()
      .subscribe((value: boolean) => {
        console.log(value);
        this.Sw_togle = value;
      });
  }
  ngOnDestroy() {
    clearInterval(this.intercalreadsceen);
  }

  public sw_onChage() {
    console.log(this.Sw_togle);
    this.fb.object("/sw_1").set(this.Sw_togle);
  }
}
