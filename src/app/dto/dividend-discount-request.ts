export class DividendDiscountRequest {

  companyName: string;
  companyTicker: string;
  currentYearsDiv: number;
  wacc: number;
  expectedGrowthRate: number;

  constructor(
    companyName: string,
    companyTicker: string,
    currentYearsDiv: number,
    wacc: number,
    expectedGrowthRate: number,
  ){
    this.companyName = companyName;
    this.companyTicker = companyTicker;
    this.currentYearsDiv = currentYearsDiv;
    this.wacc = wacc;
    this.expectedGrowthRate = expectedGrowthRate;
  }

}
