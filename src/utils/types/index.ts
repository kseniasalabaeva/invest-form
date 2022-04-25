export type IMultInput = {
  min: number,
  max: number,
  defaultValue: number,
  errors?: any,
};

export type ICustomInput = {
  type?: string,
  min?: number,
  max?: number,
  name: string,
  className?: string,
  defaultValue?: number,
  readOnly?: boolean,
  errors?: any,
};

export type IAccordion = {
  title?: string;
  children: any;
};
