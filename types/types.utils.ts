/**
 * Get type of single Element from array of Elements
 * @example ArrayElement<>
 */
export type ArrElement<Arr> = Arr extends readonly (infer ElementType)[] ? ElementType : never

/**
 * Takes object type. Return same type but parameters are optional
 * @example { age: number , user: string } --> { age?:number, user?: string }
 */
export type Partial<T> = {
  [P in keyof T]?: T[P]
}

/**
 * Create type of range of posible numbers in typescript
 */
type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N ? Acc[number] : Enumerate<N, [...Acc, Acc['length']]>

/**
 * IntRange<5, 10> --> 5 | 6 | 7 | 8 | 9 | 10
 */
export type IntRange<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>

/**
 * Some generic object 😂
 */
export type GenericObject = Record<Primitive, unknown | undefined>

/**
 * Primitive types that can be key in object
 */
export type Primitive = string | number | symbol

/**
 * Split ts type string to array by char
 * @example Split<'test.xd.lol', '.'> --> ['test','xd','lol']
 */
export type Split<S extends string, D extends string> = string extends S
  ? string[]
  : S extends ''
    ? []
    : S extends `${infer T}${D}${infer U}`
      ? [T, ...Split<U, D>]
      : [S]

/**
 * Join two strings with "."
 * @example Join<'a','b'> --> 'a.b'
 */
export type Join<L extends Primitive | undefined, R extends Primitive | undefined> = L extends string | number
  ? R extends string | number
    ? `${L}.${R}`
    : L
  : R extends string | number
    ? R
    : undefined

/**
 * Idk what is this doing
 */
export type Union<L extends unknown | undefined, R extends unknown | undefined> = L extends undefined
  ? R extends undefined
    ? undefined
    : R
  : R extends undefined
    ? L
    : L | R

/**
 * Get type from path to nested object
 * @example TypeFromPath<{ bob: { name: string } }, 'bob.name'> --> string
 */
export type TypeFromPath<T extends GenericObject, Path extends string> = {
  [K in Path]: K extends keyof T
    ? T[K]
    : K extends `${infer P}.${infer S}`
      ? T[P] extends GenericObject
        ? // @ts-ignore
          TypeFromPath<T[P], S>
        : never
      : never
}[Path]

/**
 * Get nested paths for object
 * @example NestedPaths<{ bob: { name: string, age: number } }> --> 'bob' | 'bob.name' | 'bob.age'
 */
export type NestedPaths<T extends GenericObject, Prev extends Primitive | undefined = undefined, Path extends Primitive | undefined = undefined> = {
  [K in keyof T]: T[K] extends GenericObject ? NestedPaths<T[K], Union<Prev, Path>, Join<Path, K>> : Union<Union<Prev, Path>, Join<Path, K>>
}[keyof T]

/**
 * Get all types of values in object
 * @example NestedValues<{ bob: { name: string, age: number }, franta: false }> --> string | number | boolean
 */
export type NestedValues<T extends GenericObject> = {
  [K in keyof T]: T[K] extends GenericObject ? NestedValues<T[K]> : T[K]
}[keyof T]
