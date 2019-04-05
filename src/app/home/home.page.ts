import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  constructor(public fb:AngularFireDatabase){
    this.fb.list("/logs").push({
      Temperature:Math.random(),
      Humadity:Math.random(),
      Time:new Date().getDate()
    
    
    })

  }
  ngOnInit(){
    this.fb
    .object("/DHT")
    .valueChanges()
    .subscribe((value:any)=>{
      console.log(value);
    });
    
  
  }

}
