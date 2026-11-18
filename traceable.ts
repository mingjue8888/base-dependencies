class TraceError extends Error {}

export const Traceable = <T extends object>(p: Promise<T>) => ({
    add: <K extends string, E extends object>(key: K, getValue: (p: T) => Promise<E>) =>
        Traceable(p.then(x => getValue(x).then(y => ({ ...x, [key]: y }) as T & Record<K, E>))),

    filter: (f: (x: T) => boolean, orErrorMessage: string) =>
        Traceable(p.then(x => f(x) ? p : Promise.reject(new TraceError(orErrorMessage)))),

    merge: <E extends object>(f: (x: T) => E) =>
        Traceable(p.then(x => f(x))),

    trace: () => p,
});

export const Clue = <T extends object>(x: T) =>
    Traceable(Promise.resolve(x));
