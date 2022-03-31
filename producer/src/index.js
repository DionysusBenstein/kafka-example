import { Kafka } from 'kafkajs';

const clientId = 'trading-engine';
const brokers = ['kafka:9092'];
const topic = 'message-log';

const value = 'Hello message!!!';
const partition = 0;

run();
async function run() {
    try {
        const kafka = new Kafka({
            clientId,
            brokers
        });

        const producer = kafka.producer();
        console.log('Connecting to Kafka...');
        await producer.connect();
        console.log('✅ Connected to Kafka!!!');

        const result = await producer.send({
            topic,
            messages: [{ value, partition }]
        });

        console.log(`Sent Successfully! ${JSON.stringify(result)}`);
        await producer.disconnect();
    }
    catch (err) {
        console.error(`ERROR::PRODUCER:: ${err}`);
    }
}
