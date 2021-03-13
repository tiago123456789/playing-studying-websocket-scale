const { subscriber } = require("../config/PubSubBroker");

class Topic {

    constructor() {
        this._topics = {};
    }

    subscribe(topic, callback) {
        if (!this._topics[topic]) {
            this._topics[topic] = [];
        }
        this._topics[topic].push(callback);
        subscriber.subscribe(topic);
    }

    notify(topic, message) {
        message = JSON.parse(message);
        (this._topics[topic] || []).map(callback => callback(message));
    }
}

const topic = new Topic();
module.exports = topic;