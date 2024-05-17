export class GrahamsFormulaResponse {

  creationDate: Date;
  companyName: string;
  companyTicker: string;
  eps: number;
  growthRate: number;
  currentYieldOfBonds: number;
  intrinsicValue: number;
  id?: number;

  constructor(
    creationDate: Date,
    companyName: string,
    companyTicker: string,
    eps: number,
    growthRate: number,
    currentYieldOfBonds: number,
    intrinsicValue: number,
    id: number
  ){
    this.creationDate = creationDate;
    this.companyName = companyName;
    this.companyTicker = companyTicker;
    this.eps = eps;
    this.growthRate = growthRate;
    this.currentYieldOfBonds = currentYieldOfBonds;
    this.intrinsicValue = intrinsicValue;
    this.id = id;
  }
  
}
