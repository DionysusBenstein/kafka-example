const { Kafka } = require('kafkajs');

const clientId = 'trading-engine';
const brokers = ['kafka:9092'];
const topic = 'message-log';

run();
async function run() {
  try {
    const kafka = new Kafka({
      clientId,
      brokers,
    });

    const consumer = kafka.consumer({ groupId: clientId });
    console.log('Connecting to Kafka...');
    await consumer.connect();
    console.log('✅ Connected to Kafka!!!');

    await consumer.subscribe({
      topic,
      fromBeginning: true,
    });

    await consumer.run({
      eachMessage: async (result) => {
        console.log(
          `Message ${result.message.value} on partition ${result.partition}`
        );
      },
    });
  } catch (err) {
    console.error(`ERROR::CONSUMER:: ${err}`);
  }
}
