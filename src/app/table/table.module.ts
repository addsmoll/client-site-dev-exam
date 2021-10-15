import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TableComponent } from './table.component';
import {ApiService} from "../api.service";

export const routes = [
  { path: '', component: TableComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgxDatatableModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    TableComponent
  ],
  providers: [ApiService]
})
export class TableModule { }
