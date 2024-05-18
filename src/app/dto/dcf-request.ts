export class DcfRequest {

  companyName: string;
  companyTicker: string;
  sumOfFCF: number;
  cashAndCashEquivalents: number;
  totalDebt: number;
  sharesOutstanding: number;
  wacc: number;
  growthRate: number;

  constructor(
    companyName: string,
    companyTicker: string,
    sumOfFCF: number,
    cashAndCashEquivalents: number,
    totalDebt: number,
    sharesOutstanding: number,
    wacc: number,
    growthRate: number
  ){
    this.companyName = companyName;
    this.companyTicker = companyTicker;
    this.sumOfFCF = sumOfFCF;
    this.cashAndCashEquivalents = cashAndCashEquivalents;
    this.totalDebt = totalDebt;
    this.sharesOutstanding = sharesOutstanding;
    this.wacc = wacc;
    this.growthRate = growthRate;
  }

}
