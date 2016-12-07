"use strict";
exports.logType = { CHAT: 0, LOGIN: 1, LOGOUT: 2, KICKED: 3, TIMBA: 4 };
var Timba = (function () {
    function Timba() {
        this.betAmount = 10;
        this.maxBetsPerPlayer = 10;
        this.date = new Date();
        this.numbers = [{ players: [] }, { players: [] }, { players: [] }, { players: [] }, { players: [] }, { players: [] }, { players: [] }, { players: [] }, { players: [] }, { players: [] }, { players: [] }, { players: [] }, { players: [] }, { players: [] }, { players: [] }, { players: [] }, { players: [] }, { players: [] }, { players: [] }, { players: [] }, { players: [] }, { players: [] }, { players: [] }, { players: [] }, { players: [] }, { players: [] }, { players: [] }, { players: [] }, { players: [] }, { players: [] }, { players: [] }, { players: [] }, { players: [] }, { players: [] }, { players: [] }, { players: [] }];
        this.log = [];
        this.players = [];
        this.winners = [];
        this.executing = false;
        this.closed = false;
        this.status = 0;
    }
    return Timba;
}());
exports.Timba = Timba;
//# sourceMappingURL=timba.js.map