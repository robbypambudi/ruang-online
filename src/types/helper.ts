export type ExtractProps<T> = T extends React.ComponentType<infer P> ? P : T;
export type Merge<P, T> = Omit<P, keyof T> & T;
export type ExtractTypeForm<T, K> = T extends { [key: string]: K } ? K : never;
