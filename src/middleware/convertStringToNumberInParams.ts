

export function convertStringToNumberInParams (params:any) {
  const getParams = params;
  const convertParams:number = parseInt(getParams);

  return convertParams;
}