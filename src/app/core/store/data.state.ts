import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Action, NgxsOnInit, State, StateContext } from '@ngxs/store';

import { tap } from 'rxjs';
import { DataActions } from './data.action';

export interface IDataState {
  status: string;
  statusCode: number;
  data: IDataObject[];
}

export interface IDataObject {
  name: string;
  recipe: string;
  image: string;
  userId: string;
  id: number;
}

@State<IDataState>({
  name: 'data',
  defaults: {
    statusCode: null,
    status: null,
    data: [
      {
        name: null,
        recipe: null,
        image: null,
        userId: null,
        id: NaN,
      },
    ],
  },
})
@Injectable({
  providedIn: 'root',
})
export class DataState implements NgxsOnInit {
  ngxsOnInit(ctx: StateContext<IDataState>) {
    ctx.dispatch(new DataActions.Fetch());
  }

  constructor(private http: HttpClient) {}

  @Action(DataActions.Fetch)
  fetchJson(ctx: StateContext<IDataState>) {
    return this.http.get('assets/mock/recipes.json').pipe(
      tap({
        next: (data) => {
          ctx.patchState(data);
        },
      })
    );
  }

  @Action(DataActions.Insert)
  insertJson(ctx: StateContext<IDataState>, action: DataActions.Insert) {
    let state = ctx.getState();
    action.data.id = state.data[state.data.length - 1].id + 1;
    state.data.push(action.data);
    ctx.patchState({
      ...state,
    });
  }

  @Action(DataActions.Remove)
  removeItem(ctx: StateContext<IDataState>, action: DataActions.Remove) {
    let state = ctx.getState();
    const findIndex = state.data.findIndex(item => item.id === action.id)
    state.data.splice(findIndex, 1);
    ctx.patchState({
      ...state,
    });
  }
}
