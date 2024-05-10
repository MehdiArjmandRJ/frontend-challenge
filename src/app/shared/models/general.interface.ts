export interface CheckBoxInterface {
    value: string;
    name: string;
    label: string;
    active: boolean;
  }
  
  export interface RadioButtonInterface {
    value: number | string;
    name: string;
    label: string;
    active: boolean;
  }
  
  export interface ListItemInterface {
    label: string;
    value: string | number | boolean | Object;
    avatar?: string;
    title?: string;
  }
  
  export interface UploaderDataInterface {
    file: File;
    avatarPrev: string | ArrayBuffer;
  }
  
  export interface ResponseRepositoryInterface {
    status: string;
    statusCode: number;
    data: any;
  }
  