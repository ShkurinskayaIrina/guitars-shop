import request from 'axios';
import { toast } from 'react-toastify';

import { ErrorType } from '../types/error';

export const errorHandle = (error: ErrorType): void => {

  if (!request.isAxiosError(error)) {
    throw error;
  }

  const {response} = error;

  if (response) {
    toast.info(`Ошибка ${response.status} ${response.statusText}`);
  }
};
