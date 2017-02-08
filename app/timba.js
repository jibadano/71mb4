"use strict";
exports.logType = { CHAT: 0, LOGIN: 1, LOGOUT: 2, KICKED: 3, TIMBA: 4 };
var Timba = (function () {
    function Timba() {
        this.betAmount = 10;
        this.maxBetsPerPlayer = 10;
        this.date = new Date();
        this.log = [];
        this.players = [];
        this.executing = false;
        this.closed = false;
    }
    return Timba;
}());
exports.Timba = Timba;
//# sourceMappingURL=timba.js.map