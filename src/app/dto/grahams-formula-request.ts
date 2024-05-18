export class GrahamsFormulaRequest {

  companyName: string;
  companyTicker: string;
  eps: number;
  growthRate: number;
  currentYieldOfBonds: number;

  constructor(
    companyName: string,
    companyTicker: string,
    eps: number,
    growthRate: number,
    currentYieldOfBonds: number
  ){
    this.companyName = companyName;
    this.companyTicker = companyTicker;
    this.eps = eps;
    this.growthRate = growthRate;
    this.currentYieldOfBonds = currentYieldOfBonds;
  }

}
