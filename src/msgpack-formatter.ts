export interface MessagePackFormatter {
  serialize?(source: any): any;
  deserialize?(source: any): any;
}
