import {MockInterface} from "./mock.interface";

export class MockModel{
  cowId: number;
  healthIndex: number;
  animalId: string;
  lactationNumber: number;
  ageInDays: number;


  /**
   * Constructor
   *
   * @param data
   */
  constructor(data?) {
    data = data || {};
    this.cowId = data.cowId || null;
    this.healthIndex = data.healthIndex || null;
    this.animalId = data.animalId || null;
    this.lactationNumber = data.lactationNumber || null;
    this.ageInDays = data.ageInDays || null;
  }

}

