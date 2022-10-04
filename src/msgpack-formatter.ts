export interface MessagePackFormatter {
  serialize?(source: any): any;
  deserialize?(source: any): any;
}

export interface MessagePackFormatterOfT<T> extends MessagePackFormatter {
    serialize?(source: T): any;
    deserialize?(source: any): T;
  }
  