import { MessagePackFormatter } from './msgpack-formatter';

export interface MessagePackMetadata {
    /**
     * The key being either an array index or a map key
     */
    key?: number | string;

    /**
     * The type used to construct the property instance
     */
    type?: { new(): any };

    /**
     * The formatter
     */
    formatter?: MessagePackFormatter;
}