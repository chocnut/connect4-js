"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMenu = function (payload) { return ({
    type: "UPDATE_MENU",
    payload: payload
}); };
exports.checkWinner = function (payload) { return ({
    type: "CHECK_WINNER",
    payload: payload
}); };
exports.placeColumn = function (payload) { return ({
    type: "PLACE_COLUMN",
    payload: payload
}); };
