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
  constructor(data: MockModel) {
    this.cowId = data.cowId;
    this.healthIndex = data.healthIndex;
    this.animalId = data.animalId;
    this.lactationNumber = data.lactationNumber;
    this.ageInDays = data.ageInDays;
  }

}

