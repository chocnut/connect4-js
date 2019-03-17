export function createStore(reducer: (state: object, action: object) => object) {
  let state: any;
  let listeners: Array<() => void> = [];

  const getState = () => state;

  const dispatch = (action: object) => {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  };

  const subscribe = (listener: () => void) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  };

  dispatch({});

  return { getState, dispatch, subscribe };
}

export const combineReducers = (reducers: any) => {
  return (state: any = {}, action: any) => {
    return Object.keys(reducers).reduce((nextState: any, key: any) => {
      nextState[key] = reducers[key](state[key], action);
      return nextState;
    }, {});
  };
};
