import { CONSTS } from "../common";

const negScientificNotationRegEx = /[\d]+(e-)[\d]+/;

// This will match 2021-03-15T23:30:59Z
//  and            2021-03-15T23:30:59+07:30
// also (bad)      2021-19-15T29:30:59+19:30
const iso8601LongRegex =
  /^\d{4}-[0-1][0-9]-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d(Z|(\+|-)[0-2]\d:[0-5]\d)$/;

export const isString = (value: any) => {
  return typeof value === "string" || value instanceof String;
};

const isNumeric = (value: any): boolean => {
  // not exporting because this is a dependant of isInteger and isDecimal
  // and our primary concerns are decimal, integer,
  return !Number.isNaN(value - parseFloat(value));
};

export const isDecimal = (value: any): boolean => {
  return (
    !isString(value) &&
    isNumeric(value) &&
    (hasDecimalSymbol(value) ||
      parseFloat(value) === 0 ||
      hasNegativeScientificNotation(value))
  );
};

export const isInteger = (value: any) => {
  return Number.isSafeInteger(value) && !hasDecimalSymbol(value);
};

export const hasNegativeScientificNotation = (value: any) => {
  return negScientificNotationRegEx.test("" + value);
};
export const hasDecimalSymbol = (value: any) => {
  return ("" + Number(value)).indexOf(CONSTS.DECIMAL_SYMBOL) !== -1;
};

export const isDateISO8601String = (value: any): boolean => {
  // YYYY-MM-DDThh:mm:ssTZD (eg 1997-07-16T19:20:30+01:00)
  // 1974-06-29T03:33:59(+|-)hh:mm
  // 1974-06-29T03:33:59Z

  // wont catch things like
  // 2021-03-23T23:23:58-34:00
  // or
  // 2021-03-23T28:23:58-04:00

  // consider creating date get the ISO string and compare
  // to original string.
  return iso8601LongRegex.test(value);
};

export const isDate = (value: any): boolean => {
  if (isString(value)) {
    return false;
  }

  return value instanceof Date;
};

export const hasExactlyProperties = (o: any, ...properties: string[]): boolean => {
  if (!o) {
    return false;
  }

  // coverage complains about this not be reachable
  // I guess spread operator guarantees array.
  // if (!Array.isArray(properties)) {
  //   return false;
  // }

  const objProps = Object.keys(o);

  if (objProps.length !== properties.length) {
    return false;
  }
  for (let prop of objProps) {
    if (!properties.includes(prop)) {
      return false;
    }
  }

  return true;
};
