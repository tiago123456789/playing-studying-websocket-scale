module.exports = class GameRoom {

    constructor() {
        this.players = {};
        this.totalPlayers = 0;
    }

    init(value) {
        this.players = value.players;
        this.totalPlayers = value.totalPlayers;
        return this;
    }

    isExcedded() {
        return this.totalPlayers > 2;
    }

    isFull() {
        return this.totalPlayers == 2;
    }

    reset() {
        this.players = {};
        this.totalPlayers = 0;
    }

    addPlayer(idPlayer) {
        const isFirstPlayer = this.totalPlayers == 0;
        this._incrementTotalPlayers(idPlayer);
        if (isFirstPlayer) {
            this.players[idPlayer] = {
                color: "black",
                x: 10,
                y: 10,
                width: 150,
                height: 100
            };
            return;
        }
        this.players[idPlayer] = {
            color: "black",
            x: 10,
            y: 190,
            width: 150,
            height: 100
        }
    }

    _incrementTotalPlayers(idPlayer) {
        if (!this.players[idPlayer]) this.totalPlayers += 1;
    }

    getPlayers() {
        return this.players;
    }
}