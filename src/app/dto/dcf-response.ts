export class DcfResponse {

  id?: number;
  companyName: string;
  companyTicker: string;
  sumOfFCF: number;
  cashAndCashEquivalents: number;
  totalDebt: number;
  equityValue: number;
  sharesOutstanding: number;
  intrinsicValue: number;
  creationDate: Date;

  constructor(
    companyName: string,
    companyTicker: string,
    sumOfFCF: number,
    cashAndCashEquivalents: number,
    totalDebt: number,
    equityValue: number,
    sharesOutstanding: number,
    intrinsicValue: number,
    creationDate: Date,
    id: number
  ){
    this.companyName = companyName;
    this.companyTicker = companyTicker;
    this.sumOfFCF = sumOfFCF;
    this.cashAndCashEquivalents = cashAndCashEquivalents;
    this.totalDebt = totalDebt;
    this.equityValue = equityValue;
    this.sharesOutstanding = sharesOutstanding;
    this.intrinsicValue = intrinsicValue;
    this.creationDate = creationDate;
    this.id = id;
  }

}
