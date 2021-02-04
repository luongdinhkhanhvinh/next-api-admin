export const sortByHighestNumber = (arrOfObj: any[], key: string) => {
  return arrOfObj.sort(function (a, b) {
    return b[key] - a[key];
  });
};
export const sortByLowestNumber = (arrOfObj: any[], key: string) => {
  return arrOfObj.sort(function (a, b) {
    return a[key] - b[key];
  });
};
