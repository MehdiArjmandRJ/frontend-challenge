export interface LoadingContextModel {
  key: string;
  type: LoadingType;
  value: boolean;
}

export enum LoadingType {
  fullScreen,
  component,
  default
}
