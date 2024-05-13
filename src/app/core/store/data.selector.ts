import { Selector } from '@ngxs/store';
import { DataState, IDataObject, IDataState } from './data.state';

export class DataSelectors {
  @Selector([DataState])
  static getRecipesItemNames(state: IDataState): IDataObject[] {
    return state.data;
  }

  @Selector([DataState])
  static getCountRecipesItem(state: IDataState): number {
    return state.data.length;
  }

  @Selector([DataState])
  static getMyRecipesItemNames(state: IDataState): IDataObject[] {
    return state.data.filter((item) => item.userId === '1');
  }

  @Selector([DataState])
  static getCountMyRecipesItem(state: IDataState): number {
    return state.data.filter((item) => item.userId === '1').length;
  }
}
