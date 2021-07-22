var mqtt = require('mqtt')
// establish connection to mqtt source
var client = mqtt.connect('mqtt://test.mosquitto.org')

const SUB_TOPIC = 'presence';
const END_CONN_TOPIC = 'endConnection';

// configure actions for on connection event
client.on('connect', onConnect)


client.on('message', (topic, message) => {
  if(topic === END_CONN_TOPIC) {
    client.end(onEndConnect)
    return
  }
  onMessage(topic, message);
})


function onConnect(){
  const exampleSubEvent = err => {
    if (err) {
      console.log('ERROR: ', err);
      return;
    }
    client.publish(SUB_TOPIC, 'Hello mqtt')
    setTimeout(() => {
      client.publish(END_CONN_TOPIC)
    }, 2000);
  }
  client.subscribe(SUB_TOPIC, exampleSubEvent)
  client.subscribe(END_CONN_TOPIC)
}

function onMessage(topic, message){
  const msgStr = message.toString();
  console.log('topic', topic)
  console.log('message', msgStr)
}

function onEndConnect(){
  console.log('ended connection to client');
}