export type ExchangeCompareRatesReponse = [Root2, string, any, string, any];

export interface Root2 {
  TipoCambioRangoResult: TipoCambioRangoResult;
}

export interface TipoCambioRangoResult {
  Vars: Vars;
  TotalItems: number;
}

export interface Vars {
  Var: Rates[];
}

export interface Rates {
  moneda: number;
  fecha: string;
  venta: number;
  compra: number;
}
