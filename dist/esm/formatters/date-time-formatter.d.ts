import { DateTime } from "luxon";
import { MessagePackFormatter } from "../msgpack-formatter";
declare class DateTimeFormatter implements MessagePackFormatter {
    serialize(source: any): (Date | ((ts: number) => number))[] | null;
    deserialize(source: any): DateTime;
}
export declare const dateTimeFormatter: DateTimeFormatter;
export {};
