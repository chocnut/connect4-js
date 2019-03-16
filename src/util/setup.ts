import { createStore, combineReducers } from "../lib/store";
import { game } from "../reducers/game";

const reducers = combineReducers({ game });

export const store = createStore(reducers);