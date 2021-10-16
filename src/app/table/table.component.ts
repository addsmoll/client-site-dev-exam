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
  rows: MockModel[];
  form: FormGroup;

  // Private
  private _unsubscribeAll: Subject<any>;
  editing = {};
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
   const initData = localStorage.getItem('mock');
   if (!initData) {
     this.apiService.getData()
       .pipe(takeUntil(this._unsubscribeAll))
       .subscribe(res => {
         this.temp = [...res];
         this.rows = res;
       });
   } else{
     this.rows = JSON.parse(initData);
   }

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
    this.saveRows(this.rows);
    console.log('UPDATED!', this.rows[rowIndex][cell]);
  }

  onSelect({ selected }) {
   if (selected) {
     console.log('Select Event', selected, this.selected);
     this.selected.splice(0, this.selected.length);
     this.selected.push(...selected);
   }

  }

  addRow() {
    const newEl: MockModel = new MockModel();
    this.rows.push(newEl);
    this.saveRows(this.rows);
  }

  onActivate(event) {
    // console.log('Activate Event', event);
  }


  saveRows(rows: MockModel[]) {
    this.apiService.saveData(rows);
  }

  refreshRows() {
   localStorage.removeItem('mock');
    this.apiService.getData()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(res => {
        this.temp = [...res];
        this.rows = res;
        localStorage.setItem('mock', JSON.parse(res));
      });
  }

  onDeleteRows(models: MockModel[]) {
   models.forEach((e) => {
     let index = this.rows.findIndex(f => f.cowId === e.cowId);
     if (index !== -1) {
       this.rows.splice(index, 1);
     }
   });
    console.log('newArr', this.rows.length);
    this.apiService.saveData(this.rows);
  }


}
