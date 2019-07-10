/**
 *
 * @param {Array}  array    Array of objects to convert
 * @param {String} keyField The key in array to become object key
 */
export const objectArrayToObject = (array, keyField) =>
  array.reduce((obj, item) => {
    obj[item[keyField]] = item;
    return obj;
  }, {});

/**
 *
 * @param { Any } subject The variable to clone
 */
export const clone = subject => JSON.parse(JSON.stringify(subject));

/**
 *
 * @param {Object} object Check if the given object is empty
 */
export const isEmptyObject = object =>
  Object.entries(object).length === 0 && object.constructor === Object;

export const deepClone = (object, newObject = {}) => {
  if (object) {
    if (typeof object !== 'object') {
      return object;
    }

    Object.keys(object).forEach((itemKey) => {
      const item = object[itemKey];

      switch (typeof item) {
        case 'object':
          newObject[itemKey] = deepClone(item, newObject[itemKey]);
          break;

        default:
          newObject[itemKey] = item;
          break;
      }
    });

    return newObject;
  }

  return object;
};

/**
 *
 * @param {*} object The data type to check
 */
export const isObject = object =>
  (typeof object === 'object' && object !== null) || object.constructor === Object;

export const escapeJSON = (string) => {
  if (string) {
    return string.replace(/(["])/g, '\\"');
  }

  return '';
};

/**
 * @name host
 * @description Returns a the valid host name for connecting to the api.
 *
 * @return {String} Api host name
 */
export const apiHost = () => `https://${window.location.href.replace(/^http[s]?:\/\/(.+?)(?::|\/).*$/, '$1')}`;

const pageBreakpoints = {
  iframeLg: 1392,
  xl: 1200,
  lg: 992,
  md: 768,
  sm: 576,
  xs: 0,
};

export const withinBreakpoint = breakpoint => window.innerWidth >= pageBreakpoints[breakpoint];

export const getBreakpoint = (breakpoints) => {
  let value = null;

  Object.keys(breakpoints).forEach((breakpoint) => {
    if (withinBreakpoint(breakpoint)) {
      value = breakpoints[breakpoint];
    }
  });

  return value;
};
