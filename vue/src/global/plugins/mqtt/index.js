import Mqtt from 'mqtt';

const mqtt = {
  connection: null,
  subscriptions: {},

  async connect(host, port) {
    if ($ENV('TEEDEV_MQTT_HOST')) {
      this.connection = Mqtt.connect(`${host || $ENV('TEEDEV_MQTT_HOST')}:${port || $ENV('TEEDEV_MQTT_PORT')}`);

      return new Promise((resolve) => {
        this.connection.on('connect', () => {
          this.connection.on('message', (topic, message) => {
            const subTopics = Object.keys(this.subscriptions);

            for (let i = 0; i < subTopics.length; i += 1) {
              const subTopic = subTopics[i];

              if (subTopic === topic) {
                const subCallback = this.subscriptions[topic];
                const stringMessage = message.toString();

                if (stringMessage) {
                  subCallback(JSON.parse(stringMessage));
                } else {
                  subCallback();
                }
              }
            }
          });

          resolve();
        });
      });
    }

    return null;
  },

  // async reconnect() {
  // },

  // async disconnect() {
  // },

  async subscribe(topic, callback) {
    return new Promise((resolve, reject) => {
      this.connection.subscribe(topic, (err) => {
        if (!err) {
          this.subscriptions[topic] = callback;
          resolve(topic);
        } else {
          console.error(`Mqtt: Failed to subscribe to ${topic}`);
          reject(err);
        }
      });
    });
  },

  // async unsubscribe(topic) {
  // },

  async publish(topic, message) {
    this.connection.publish(topic, message ? JSON.stringify(message) : null);
  },

  subscribeToSubscriptions() {
    const topics = Object.keys(this.subscriptions);

    for (let i = 0; i < topics.length; i += 1) {
      const topic = topics[i];
      const callback = this.subscriptions[topic];

      this.subscribe(topic, callback);
    }
  },
};

export default mqtt;

export const installer = (Vue) => {
  Vue.prototype.$mqtt = mqtt;

  mqtt.connect();
};

export const uninstaller = (Vue) => {
  delete Vue.prototype.$mqtt;

  mqtt.disconnect();
};
