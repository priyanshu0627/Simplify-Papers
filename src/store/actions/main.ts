import * as t from '../types';

export const setInfo =
  (name: any) => (dispatch: (arg0: { type: string; payload: any }) => void) => {
    dispatch({
      type: t.SET_NAME,
      payload: name,
    });
  };
