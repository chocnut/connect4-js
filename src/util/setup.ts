import { createStore, combineReducers } from "../lib/store";
import { game } from "../reducers/game";
import { winner } from "../reducers/winner";

const reducers = combineReducers({ game, winner });

export const store = createStore(reducers);