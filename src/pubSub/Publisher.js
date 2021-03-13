const { publisher } = require("../config/PubSubBroker");

class Publisher {

    publish(topic, message) {
        publisher.publish(topic, JSON.stringify(message));
    }
}

const publisherObject = new Publisher();
module.exports = publisherObject;