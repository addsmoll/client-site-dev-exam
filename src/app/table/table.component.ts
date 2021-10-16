import {Component, ViewEncapsulation, ViewChild, OnInit, OnDestroy} from '@angular/core';
import {ColumnMode, DatatableComponent} from '@swimlane/ngx-datatable';
import {ApiService} from "../api.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {takeUntil} from "rxjs/operators";
import {MockModel} from "../mock.model";
import {Subject} from "rxjs";

@Component({
  selector: 'app-ngx',
  templateUrl: './table.component.html',
  encapsulation: ViewEncapsulation.None
})
export class TableComponent implements OnInit, OnDestroy{
  tableData: MockModel[];
  form: FormGroup;

  // Private
  private _unsubscribeAll: Subject<any>;
  editing = {};
  rows = [];
  temp = [];
  selected = [];
  loadingIndicator: boolean = true;
  ColumnMode = ColumnMode;

  @ViewChild(DatatableComponent) table: DatatableComponent;

 constructor(
   private apiService: ApiService,
 ) {
   this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.apiService.getData()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(res => {
        this.temp = [...res];
        this.rows = res;
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  updateValue(event, cell, rowIndex) {
    console.log('inline editing rowIndex', rowIndex);
    this.editing[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = event.target.value;
    this.rows = [...this.rows];
    console.log('UPDATED!', this.rows[rowIndex][cell]);
  }

  onSelect({ selected }) {
   if (selected) {
     console.log('Select Event', selected, this.selected);
     this.selected.splice(0, this.selected.length);
     this.selected.push(...selected);
   }

  }

  onDeleteRow(row) {

  }

  addRow() {

  }

  onActivate(event) {
    // console.log('Activate Event', event);
  }

}
