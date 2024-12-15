import { NestedPaths, TypeFromPath, GenericObject, Split, NestedValues } from '@/types'

/**
 * Map nested object
 * @returns mapped object
 */
export const mapObject = <T extends GenericObject>(object: T, map: (value: NestedValues<T>) => any): T & GenericObject => {
  return Object.fromEntries(
    // @ts-ignore
    Object.entries(object).map((entry: any) => {
      const key = entry[0]
      const value = entry[1]
      // @ts-ignore
      if (typeof value === 'object') return [key, mapObject(value, map)]
      else return [key, map(value)]
    })
  )
}

/**
 * Function will merge more object to one. Cant handle object with same values in property. Just if the value is object too.
 *
 * @param objects array
 * @returns object
 */
export function merge(...objects: GenericObject[]) {
  let result = {} as any,
    obj

  for (var i = 0; i < arguments.length; i++) {
    obj = arguments[i]
    for (let key in obj) {
      if (Object.prototype.toString.call(obj[key]) === '[object Object]') {
        if (typeof result[key] === 'undefined') {
          result[key] = {}
        }
        result[key] = merge(result[key], obj[key])
      } else {
        result[key] = obj[key]
      }
    }
  }
  return result
}

export function removeProperty<T extends GenericObject>(object: T, path: string) {
  let copy = JSON.parse(JSON.stringify(object))
  // @ts-ignore
  let arr = path.split('.')
  let last = arr.pop()
  delete arr.reduce((o: any, k: any) => o[k] || {}, copy)[last as string]

  return copy
}

/**
 * Function that can return complex object with new property inside property that doesnt exist. Or just edit complex object.
 * @param path
 * @param value
 * @param object object for edit
 *
 * @example setProperty('users.pepa.name', 'Pepa') --> { users: { pepa: { name: 'Pepa' } } }
 * @example setProperty('users.pepa.name', 'Pepa', { users: { franta: null } }) --> { users: { franta: null, pepa: { name: 'Pepa' } } }
 */
// @ts-ignore
export function setProperty<T extends GenericObject, P extends string>(
  path: P,
  // @ts-ignore
  value: TypeFromPath<T, P> extends never ? unknown : TypeFromPath<T, P>,
  object?: T
) {
  if (!object) object = {} as any
  let schema: any = object // a moving reference to internal objects within obj
  const keys = (path as any).split('.')
  for (let i = 0; i < keys.length - 1; i++) {
    let elem = keys[i]
    if (!schema[elem]) schema[elem] = {}
    schema = schema[elem]
  }

  schema[keys[keys.length - 1]] = value

  return object as T & GenericObject
}

/**
 * Get value of some property in object with path of property. ALSO WITH TYPE
 *
 * @param object
 * @param path path in object
 * @example getProperty({ bob: { name: 'Bob' } }, 'bob.name') --> 'Bob' of type string
 * @returns
 */
// @ts-ignore
export function getProperty<T extends GenericObject, P extends NestedPaths<T>>(object: T, path: P) {
  // @ts-ignore
  const keys = (path as any).split('.') as Split<NestedPaths<T>, '.'>
  let value = object
  // @ts-ignore
  for (const key of keys) {
    // @ts-ignore
    if (!value) return undefined as TypeFromPath<T, P>
    // @ts-ignore
    value = value[key]
  }
  return value as TypeFromPath<T, P>
}

function traverseAndFlatten(object: GenericObject, target: GenericObject, prefix?: string) {
  for (var key in object) {
    if (object.hasOwnProperty(key)) {
      var newKey
      if (prefix === undefined) {
        newKey = key
      } else {
        newKey = prefix + '.' + key
      }

      var value = object[key]
      if (typeof value === 'object') {
        traverseAndFlatten(value as any, target, newKey)
      } else {
        target[newKey] = value
      }
    }
  }
}

/**
 * Function will convert object to flat object
 * @example => { bob: { name: 'Bob', age: 12 } } --> { bob.name: 'Bob', bob.age: 12 }
 *
 *
 * @param object GenericObject
 * @returns
 */
export function flatten(object: GenericObject) {
  var container = {}
  traverseAndFlatten(object, container)
  return container
}

/**
 * @brief Convert object to formData for form send
 *
 * @param obj
 * @param form
 * @param namespace
 * @returns
 */
export const objectToFormData = (data: Record<string, any>, form = new FormData(), namespace = '') => {
  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      const value = data[key]
      const formKey = namespace ? `${namespace}[${key}]` : key

      if (typeof value === 'object' && !(value instanceof File || value instanceof Blob)) {
        objectToFormData(value, form, formKey)
      } else {
        form.append(formKey, value)
      }
    }
  }
  return form
}
