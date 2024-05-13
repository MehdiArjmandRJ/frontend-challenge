import { IDataObject } from './data.state';

export namespace DataActions {
  export class Fetch {
    static readonly type = '[App] Fetch Data';
  }

  export class Insert {
    static readonly type = '[App] Insert Data';
    constructor(public data: IDataObject) {}
  }

  export class Remove {
    static readonly type = '[App] Remove Data';
    constructor(public id: number) {}
  }
}
