import * as t from '../types';

const main = (
  // eslint-disable-next-line @typescript-eslint/default-param-last
  state = {
    name: 'guest',
  },
  action: { type: any; payload: any }
) => {
  switch (action.type) {
    case t.SET_NAME:
      return {
        ...state,
        name: action.payload,
      };
    default:
      return { ...state };
  }
};

export default main;
