"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logType = { CHAT: 0, LOGIN: 1, LOGOUT: 2, KICKED: 3, TIMBA: 4 };
var Timba = (function () {
    function Timba() {
        this.playTime = 16;
        this.betAmount = 10;
        this.maxBetsPerPlayer = 50;
        this.date = new Date();
        this.log = [];
        this.players = [];
        this.executing = false;
        this.closed = false;
        this.running = false;
    }
    return Timba;
}());
exports.Timba = Timba;
//# sourceMappingURL=timba.js.map