import {MockInterface} from "./mock.interface";

export class MockModel{
  cowId: number;
  heatIndexPeak: string;
  animalId: string;
  lactationNumber: string;
  ageInDays: string;


  /**
   * Constructor
   *
   * @param data
   */
  constructor(data?) {
    data = data || {};
    this.cowId = data.cowId || this.generateID();
    this.heatIndexPeak = data.heatIndexPeak || 0;
    this.animalId = data.animalId || 0;
    this.lactationNumber = data.lactationNumber || 0;
    this.ageInDays = data.ageInDays || 0;
  }

  private generateID(): string
  {
    function S4(): string
    {
      return Math.floor((1 + Math.random()) * 0x1000)
        .toString(8)
        .substring(1);
    }

    return S4();
  }

}

