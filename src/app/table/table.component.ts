import {Component, ViewEncapsulation, ViewChild, OnInit, OnDestroy} from '@angular/core';
import {ColumnMode, DatatableComponent} from '@swimlane/ngx-datatable';
import {ApiService} from "../api.service";
import {FormGroup} from "@angular/forms";
import {takeUntil} from "rxjs/operators";
import {MockModel} from "../mock.model";
import {Subject} from "rxjs";

@Component({
  selector: 'app-ngx',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TableComponent implements OnInit, OnDestroy{
  rows: MockModel[];
  form: FormGroup;
  editing = {};
  temp = [];
  selected = [];
  loadingIndicator: boolean = true;
  ColumnMode = ColumnMode;

  // Private
  private _unsubscribeAll: Subject<any>;

  @ViewChild(DatatableComponent) table: DatatableComponent;

 constructor(
   private apiService: ApiService,
 ) {
   this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    setTimeout(() => { this.loadingIndicator = false; }, 1500);
   this.fetchData();
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  fetchData() {
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
     this.selected.splice(0, this.selected.length);
     this.selected.push(...selected);
   }
  }

  addRow() {
    this.rows.push(Object.assign({}, new MockModel()));
    this.rows = [...this.rows];
    this.apiService.saveData(this.rows);
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
   let newArr = [];
      newArr = this.rows.filter(f => f.cowId !== models[0].cowId);
      this.rows = newArr;
    this.apiService.saveData(this.rows);
    this.selected = [];
  }


}
