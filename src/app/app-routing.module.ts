import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EquipmentDetailsComponent } from './equipment-details/equipment-details.component';

const routes: Routes = [
  {path:'', component:DashboardComponent, pathMatch: "full",
},
  {path:'EqipDetail/:id', component:EquipmentDetailsComponent, pathMatch: "full",
}

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
