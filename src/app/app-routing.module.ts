import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeAddEditComponent } from './employee/employee-add-edit/employee-add-edit.component';


const routes: Routes = [
  { path: '', component: EmployeeComponent },
  { path: 'add', component: EmployeeAddEditComponent },
  { path: 'edit/:id', component: EmployeeAddEditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
