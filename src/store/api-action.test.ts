import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createAPI} from '../services/api';
import {State} from '../types/state';
import { makeFakeGuitar, makeFakeComment } from '../utils/mocks';
import { fetchCatalogGuitars, fetchGuitar, fetchComments } from './api-actions';
import { loadCatalog, loadGuitar, loadComments } from './guitars-data/guitars-data';
import { APIRoute } from '../consts';

describe ('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
      State,
      Action,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  const mockGuitar = makeFakeGuitar();
  const mockCatalog = new Array(20).fill(null).map(()=>(makeFakeGuitar()));
  const mockComments = new Array(20).fill(null).map(() => (makeFakeComment()));

  it ('dispatch loadCatalog когда GET /guitars', async ()=> {
    mockAPI
      .onGet(APIRoute.Guitars)
      .reply(200, mockCatalog);

    const store = mockStore();
    await store.dispatch(fetchCatalogGuitars());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(loadCatalog.toString());
  });

  it ('dispatch loadGuitar когда GET /guitars/id', async ()=> {
    mockAPI
      .onGet(`${APIRoute.Guitars}/${mockGuitar.id}`)
      .reply(200, mockGuitar);

    const store = mockStore();
    await store.dispatch(fetchGuitar(mockGuitar.id));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(loadGuitar.toString());
  });

  it ('dispatch loadComments когда GET /guitars/id/comments', async ()=> {
    mockAPI
      .onGet(`${APIRoute.Guitars}/${mockGuitar.id}/comments`)
      .reply(200, mockComments);

    const store = mockStore();
    await store.dispatch(fetchComments(mockGuitar.id));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(loadComments.toString());
  });
});
