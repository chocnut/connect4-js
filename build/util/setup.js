"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var store_1 = require("../lib/store");
var game_1 = require("../reducers/game");
var winner_1 = require("../reducers/winner");
var reducers = store_1.combineReducers({ game: game_1.game, winner: winner_1.winner });
exports.store = store_1.createStore(reducers);
