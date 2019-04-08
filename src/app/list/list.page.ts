import { MyserviceService } from './../services/myservice.service';
import { Component, OnInit } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import { AlertController } from '@ionic/angular';
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
  constructor(public fb: AngularFireDatabase,public ms$: MyserviceService,public alertController: AlertController) {}

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
        this.OnSerch(this.serchLogs);
        //console.log(this.dataLogs);
      });
  }
  public onDelete(key: string) {
    this.ms$.presentAlertConfirm("ทดสอบ").then(async (value:boolean)=>{
      this.dataLogs = [];
      this.fb.object("/logs/" + key).remove();
      //this.fb.list("/logs").remove(key);
      const alert = await this.alertController.create({
        header: 'Alert',
        message: 'ลบเรียบร้อย',
        buttons: ['OK']
      });
  
      await alert.present();
       }).catch(async (reason)=>{
        const alert = await this.alertController.create({
          header: 'Alert',
          message: 'ยกเลิกเเล้ว',
          buttons: ['OK']
        });
    
        await alert.present();
       });
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
    //  console.log(this.dataLogs.filter(
    //   (c: any) =>
    //     c.payload.Temperature.toString().search(txt) != -1 ||
    //     c.payload.Humadity.toString().search(txt) != -1
    // ));
  }

  public convertJson(data:any){
    return JSON.stringify(data);
  }
}
