import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TableComponent } from './table.component';
import {ApiService} from "../api.service";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatBadgeModule} from "@angular/material/badge";

export const routes = [
  { path: '', component: TableComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    NgxDatatableModule,
    RouterModule.forChild(routes),
    MatBadgeModule
  ],
  declarations: [
    TableComponent
  ],
  providers: [ApiService]
})
export class TableModule { }
