"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createStore(reducer) {
    var state;
    var listeners = [];
    var getState = function () { return state; };
    var dispatch = function (action) {
        state = reducer(state, action);
        listeners.forEach(function (listener) { return listener(); });
    };
    var subscribe = function (listener) {
        listeners.push(listener);
        return function () {
            listeners = listeners.filter(function (l) { return l !== listener; });
        };
    };
    dispatch({});
    return { getState: getState, dispatch: dispatch, subscribe: subscribe };
}
exports.createStore = createStore;
exports.combineReducers = function (reducers) {
    return function (state, action) {
        if (state === void 0) { state = {}; }
        return Object.keys(reducers).reduce(function (nextState, key) {
            nextState[key] = reducers[key](state[key], action);
            return nextState;
        }, {});
    };
};
