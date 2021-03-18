export type SORT_TYPE = "string" | "number" | "date";

export type Obj = {
  [key: string]: any;
};

/**
 * Sort compare function for two objects
 * @param currentObj
 * @param nextObj
 * @param param2
 * @returns
 */
export function compareObjFn(
  currentObj: Obj,
  nextObj: Obj,
  {
    key,
    type,
  }: {
    key: string;
    type: SORT_TYPE;
  }
) {
  let currentVal;
  let nextVal;
  if (currentObj[key] && nextObj[key]) {
    if (type === "number") {
      currentVal = Number(currentObj[key]) || 0;
      nextVal = Number(nextObj[key]) || 0;
    } else if (type === "date") {
      currentVal = new Date(currentObj[key]) || "";
      nextVal = new Date(nextObj[key]) || "";
    } else {
      currentVal = currentObj[key].toLowerCase();
      nextVal = nextObj[key].toLowerCase();
    }
    if (nextVal < currentVal) {
      return 1;
    }
    if (nextVal > currentVal) {
      return -1;
    }
  }
  return 0;
}

/**
 * Sort an array of objects
 * @param arr
 * @param param1
 * @returns
 */
export function sortArrOfObj<T extends Obj>(
  arr: Array<T>,
  {
    objectKey,
    sortOrder,
    keyValueType,
  }: {
    objectKey: string;
    sortOrder: "asc" | "desc";
    keyValueType: SORT_TYPE;
  }
) {
  const sortedArrInAsc = [...arr].sort((currentObj, nextObj) =>
    compareObjFn(currentObj, nextObj, {
      key: objectKey,
      type: keyValueType,
    })
  );
  if (sortOrder === "desc") {
    const sortedArrInDesc = [...sortedArrInAsc].reverse();
    return sortedArrInDesc;
  }
  return sortedArrInAsc;
}

/**
 * Convert number in centimeters to an object containing feet and inches
 * @param cm
 * @returns
 */
export function convertCentimetersToFeetAndInches(cm: number) {
  const realFeet = (cm * 0.3937) / 12;
  const feet = Math.floor(realFeet);
  const inches = Math.round((realFeet - feet) * 12);
  return {
    feet,
    inches,
  };
}

/**
 * Map an array of objects to a Javascript Object
 * @param items
 * @param key
 * @returns
 */
export function mapArrayOfObjToObj<T extends Obj[]>(
  items: T,
  key: string
): { [key: string]: T[number] } {
  return items.reduce((obj, currentObj) => {
    obj[currentObj[key]] = currentObj;
    return obj;
  }, {});
}
