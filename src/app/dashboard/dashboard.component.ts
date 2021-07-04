import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';
import { EquipmentDetails } from './equipDetails'
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  equipModal : EquipmentDetails;
  equipModalArray : EquipmentDetails[] = [];
  equipModalArrayTemp : EquipmentDetails[] = [];
 
  errorMsg : string = 'No Data Found!'
  dataErrorMsg : string ='Something Went Wrong, please try after sometime!';
  dataErrorFlag : boolean =false;
  errorFlag : boolean = false;
  constructor( public localService: MainService , private router:Router) { }
  searchText : string;
  

  searchDetails(){
    this.equipModalArray = [];
    this.errorFlag =false;
    console.log( this.equipModalArrayTemp);
      this.equipModalArrayTemp.filter(x=>{
        if (x.name.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1){
          this.equipModalArray.push(x);
        }
      })
      if (this.equipModalArray.length == 0){
        this.errorFlag =true;
      }
      if (this.searchText.length == 0){
        this.equipModalArray = this.equipModalArrayTemp;
      }
  }
  
   EqipDetail(row){
    this.router.navigate(['/EqipDetail',row.index])

  }


  ngOnInit(): void {
    this.localService.getEqipmentDetails().subscribe(data=>{
      this.errorFlag = false;
      this.dataErrorFlag = false;
      this.localService.goback = true;
      this.equipModalArray = [];
      for(let x of data['results']){
          this.equipModal = new EquipmentDetails();
          this.equipModal.index = x.index;
          this.equipModal.name = x.name;
          this.equipModal.url= x.url;
          this.equipModalArray.push(this.equipModal);
      }
      this.equipModalArrayTemp = this.equipModalArray;
    },err=>{
          this.dataErrorFlag = true;
    }
    )
   
  }

}
