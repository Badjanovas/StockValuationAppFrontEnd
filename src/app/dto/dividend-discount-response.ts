export class DividendDiscountResponse {

  companyName: string;
  companyTicker: string;
  currentYearsDiv: number;
  valueOfNextYearsDiv: number;
  wacc: number;
  expectedGrowthRate: number;
  intrinsicValue: number;
  creationDate: Date;
  id?: number;

  constructor(
    companyName: string,
    companyTicker: string,
    currentYearsDiv: number,
    valueOfNextYearsDiv: number,
    wacc: number,
    expectedGrowthRate: number,
    intrinsicValue: number,
    creationDate: Date,
    id?: number
  ){
    this.companyName = companyName;
    this.companyTicker = companyTicker;
    this.currentYearsDiv = currentYearsDiv;
    this.valueOfNextYearsDiv = valueOfNextYearsDiv;
    this.wacc = wacc;
    this.expectedGrowthRate = expectedGrowthRate;
    this.intrinsicValue = intrinsicValue;
    this.creationDate = creationDate;
    this.id = id;
  }

}
