const GameRoom = require("./GameRoom");
const { subscriber } = require("./config/PubSubBroker");
const cache = require("./utils/Cache");
const topic = require("./pubSub/Topic");
const publisher = require("./pubSub/Publisher");

module.exports = (io) => {
    return async function(socket) {
        let { room, idPlayer } = socket.handshake.query;
        const keyCache = `${room}`;
        const isExistRoom = await cache.exists(keyCache);
        if (!isExistRoom) {
            await cache.set(keyCache, new GameRoom());
        }

        socket.join(room);
        room = await cache.get(keyCache).then(data => new GameRoom().init(data));

        if (room && room.isExcedded()) room.reset();
        if (room && !room.isFull()) room.addPlayer(idPlayer);
        if (room && room.isFull()) io.to(room).emit("start-game", room.getPlayers());

        await cache.set(keyCache, room);

        socket.on("is_start_game", () => {
            if (room && room.isFull()) {
                publisher.publish("start-game", {
                    room: socket.handshake.query.room,
                    data: room.getPlayers()
                });
            }
        });

        socket.on("move", (data) => {
            publisher.publish("move", {
                room: socket.handshake.query.room,
                data: data
            });
        });

        subscriber.on("message", (channel, message) => topic.notify(channel, message));
    }
}