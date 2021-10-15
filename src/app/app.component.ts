import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApiService} from "./api.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {MockModel} from "./mock.model";
import {MockInterface} from "./mock.interface";
import validate = WebAssembly.validate;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  tableData: MockModel[];
  displayColumns = ["cowId", "healthIndex", "animalId", "lactationNumber", "ageInDays", "edit"];
  form: FormGroup;


  // Private
  private _unsubscribeAll: Subject<any>;

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
      edit: [''],
    });

    this.apiService.getData()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(res => {
        this.tableData = res.result;
        res.result.forEach((e: any) => {
          this.loadForm(e);
        })

      });
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
      edit: tableData.edit
    });
  }

   saveForm(model: MockModel) {
    const newArr: MockModel[] = this.tableData.filter(f => f.cowId === model.cowId);
    newArr.push(model);
    this.apiService.saveData(newArr);
  }



}
