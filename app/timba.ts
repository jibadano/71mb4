export var logType = {CHAT:0, LOGIN:1, LOGOUT:2, KICKED:3,TIMBA:4};

export class Timba {
	betAmount: number = 10;
	maxBetsPerPlayer : number = 10;
	date: Date = new Date();
	numbers: [{players:any[]}] = [{players:[]},{players:[]},{players:[]},{players:[]},{players:[]},{players:[]},{players:[]},{players:[]},{players:[]},{players:[]},{players:[]},{players:[]},{players:[]},{players:[]},{players:[]},{players:[]},{players:[]},{players:[]},{players:[]},{players:[]},{players:[]},{players:[]},{players:[]},{players:[]},{players:[]},{players:[]},{players:[]},{players:[]},{players:[]},{players:[]},{players:[]},{players:[]},{players:[]},{players:[]},{players:[]},{players:[]} ];
	log: any[] = [];
	players: any[] = [];
	winners: any[] = [];
	executing: boolean = false;
	closed: boolean = false;
}

