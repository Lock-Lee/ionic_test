import { Component, OnInit } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
export interface data{
  payload : any;
  key : string;

}
@Component({
  selector: "app-list",
  templateUrl: "list.page.html",
  styleUrls: ["list.page.scss"]
})
export class ListPage implements OnInit {
  public dataLogs: Array<any> = [];
  public serchLogs: string = "";
  public dataSerchLogs: Array<any> = [];
  constructor(public fb: AngularFireDatabase) {}

  ngOnInit() {
    this.fb
      .list("/logs")
      .snapshotChanges()
      .subscribe((value: any) => {
        this.dataLogs = [];
        value.forEach(element => {
          this.dataLogs.push({
            key: element.key,
            payload: element.payload.val()
          });
        });
        this.OnSerch("");
        console.log(this.dataLogs);
      });
  }
  public onDelete(key: string) {
    //console.log(key);
    if (confirm("คุณต้องการลบใช่หรือไม่")) {
      this.dataLogs = [];
      this.fb.object("/logs/" + key).remove();
    }
    //  this.fb.list("/logs").remove(key);
  }
  public OnSerch(text: string) {
    let txt = new RegExp(this.serchLogs, "gi");
    this.dataSerchLogs =
      text.length > 0
        ? this.dataLogs.filter(
            (c: any) =>
              c.payload.Temperature.toString().search(txt) != -1 ||
              c.payload.Humadity.toString().search(txt) != -1
          )
        : this.dataLogs;
     console.log(this.dataLogs.filter(
      (c: any) =>
        c.payload.Temperature.toString().search(txt) != -1 ||
        c.payload.Humadity.toString().search(txt) != -1
    ));
  }

  public convertJson(data:any){
    return JSON.stringify(data);
  }
}
