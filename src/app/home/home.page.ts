import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  public dataDHT:any ;
  public dataDHT1:any ;
  public screenDisplay:any=null;
  public thresholdConfig = {
    '0': {color: 'green'},
    '40': {color: 'orange'},
    '75.5': {color: 'red'}
};

  constructor(public fb:AngularFireDatabase){


    this.fb.list("/logs").push({
      Temperature:Math.random()*100,
      Humadity:Math.random()*100,
      // Time:`${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear}`
    
     Time : new Date().getHours()+":"+new Date().getMinutes()+":"+new Date().getSeconds(),
     
    
    });
    setInterval(()=>{
      this.screenDisplay ={
        heiht:screen.availHeight/2.5,
        width:screen.availWidth/40
      };
      console.log(this.screenDisplay)
    },100);

  }
  ngOnInit(){
    this.fb
    .object("/DHT")
    .valueChanges()
    .subscribe((value:any)=>{
      console.log(value);
      this.dataDHT =value;
    });
    
  /**
   * name
   */
  
  }


}
