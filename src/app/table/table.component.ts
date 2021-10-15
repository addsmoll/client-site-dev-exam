import {Component, ViewEncapsulation, ViewChild, OnInit, OnDestroy} from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
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

  @ViewChild(DatatableComponent) table: DatatableComponent;

 constructor(
   private apiService: ApiService,
   private _formBuilder: FormBuilder,
 ) {
   this._unsubscribeAll = new Subject();

  }



  ngOnInit(): void {
    this.form = this._formBuilder.group({
      cowId: [''],
      healthIndex: [''],
      animalId: [''],
      lactationNumber: [''],
      ageInDays: [''],
    });

    this.apiService.getData()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(res => {
        this.tableData = res;
        res.forEach((e: any) => {
          this.loadForm(new MockModel(e));
        });
        this.temp = [...res];
        this.rows = res;
      });

    setTimeout(() => { this.loadingIndicator = false; }, 1500);
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  loadForm(tableData: any) {
    this.form.patchValue({
      cowId: tableData.cowId,
      healthIndex: tableData.healthIndex,
      animalId: tableData.animalId,
      lactationNumber: tableData.lactationNumber,
      ageInDays: tableData.ageInDays,

    });
  }

  updateValue(event, cell, cellValue, row) {
    this.editing[row.$$index + '-' + cell] = false;
    this.rows[row.$$index][cell] = event.target.value;
  }

  onSelect({ selected }) {
    console.log('Select Event', selected, this.selected);
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  onActivate(event) {
    console.log('Activate Event', event);
  }

}
