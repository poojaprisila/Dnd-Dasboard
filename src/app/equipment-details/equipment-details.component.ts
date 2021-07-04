import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';
import { EquipTable } from '../dashboard/equipTable';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-equipment-details',
  templateUrl: './equipment-details.component.html',
  styleUrls: ['./equipment-details.component.css']
})
export class EquipmentDetailsComponent implements OnInit {

  constructor(public localService: MainService,
   private router:ActivatedRoute) { }
  object : EquipTable = new EquipTable();
  objEquipment = ['equipment_category','gear_category','weight','name'];
  goback:boolean = false;

  goToBack(){
   // this.localService.goback = true;
   location.reload();
    this.localService.getEqipmentDetails();
  }

  
  ngOnInit(): void {
    let index = this.router.snapshot.paramMap.get('id')
     this.localService.getDeatils(index).subscribe(data=>{
       this.localService.goback = true;
      for(let x of this.objEquipment){
        if (data[x] != undefined){
          if (x == 'equipment_category' || x == 'gear_category'){
            this.object[x] =  data[x]['name']
          }
          else{
            this.object[x] =  data[x]
          }   
        }
        else{
          this.object[x] = "Not Available";
        }
      }
      console.log(JSON.stringify(this.object))
     
    });
  }
}
