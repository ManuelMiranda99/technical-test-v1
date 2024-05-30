export type RootInitial = [Root2Initial, string, any, string, any];

export interface Root2Initial {
  TipoCambioFechaInicialResult: TipoCambioFechaInicialResult;
}

export interface TipoCambioFechaInicialResult {
  Vars: VarsInitial;
  TotalItems: number;
}

export interface VarsInitial {
  Var: RateInitial[];
}

export interface RateInitial {
  moneda: number;
  fecha: string;
  venta: number;
  compra: number;
}
