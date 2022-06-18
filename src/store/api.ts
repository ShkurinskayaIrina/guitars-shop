import { APIRoute } from '../consts';
import { createAPI } from '../services/api';
import { errorHandle } from '../services/error-handle';

const api = createAPI();

export const fetchCountComments = async (id: number) => {
  try {
    const {data} = await api.get(`${APIRoute.Guitars}/${id}/comments`);
    return data.length;
  } catch (error) {
    errorHandle(error);
  }
};
