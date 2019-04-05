import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';


@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  public dataLogs :any = [];
  constructor(public fb:AngularFireDatabase){
    
  }
  

  ngOnInit() {
    this.fb.list("/logs")
    .snapshotChanges()
    .subscribe((value:any)=>{
      
      value.forEach(element => {
        this.dataLogs.push({
          key:element.key,
          payload:element.payload.val()
        });
        
      });
      console.log(this.dataLogs)
      
    })
  }
  public onDelete(key:string){
    //console.log(key);
    if(confirm("คุณต้องการลบใช่หรือไม่")){
     this.fb.object("/logs/"+key).remove();

    }
  //  this.fb.list("/logs").remove(key);
  }
  

}
