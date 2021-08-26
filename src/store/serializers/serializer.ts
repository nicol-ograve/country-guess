export interface Serializer<T> {
    serialize: (value: T) => string;
    deserialize: (value: string) => T;
}