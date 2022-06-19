import {AxiosInstance} from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { errorHandle } from '../services/error-handle';
import { loadCatalog, loadGuitar, loadComments } from './guitars-data/guitars-data';

import { Guitar, Guitars, NewComment, Comments } from '../types/guitars';
import { APIRoute } from '../consts';

export const fetchCatalogGuitars = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'guitars/fetchCatalogGuitars',
  async(_arg, {dispatch, extra: api})=>{
    try {
      const { data } = await api.get<Guitars>(APIRoute.Guitars);
      dispatch(loadCatalog(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchGuitar = createAsyncThunk<void, number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'guitars/fetchGuitar',
  async (id, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<Guitar>(`${APIRoute.Guitars}/${id}`);
      dispatch(loadGuitar(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchComments = createAsyncThunk<void, number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'guitar/fetchComments',
  async (id, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<Comments>(`${APIRoute.Guitars}/${id}/comments`);
      dispatch(loadComments(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const addCommentAction  = createAsyncThunk<void, NewComment, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'guitar/addCommentAction',
  async (comment, {dispatch, extra: api}) => {
    try {
      await api.post<Comments>(APIRoute.Comments, comment);
      dispatch(fetchComments(Number(comment.guitarId)));
    } catch (error) {
      errorHandle(error);
    }
  },
);


