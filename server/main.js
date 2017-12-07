import { Meteor } from 'meteor/meteor';
import SerialPort from 'serialport';
import tea from '../imports/api/tea.js'
let currentTea = null;
//let greentea_duration = 180000;
import { connect } from 'mqtt/lib/connect';

export const config = {
  mqttHost: "mqtt://127.0.0.1",
  mqttPort: 1883
};

export const client = connect(config.mqttHost);

client.on("connect", function() {
  console.log("---- mqtt client connected ----");
})


const Readline = SerialPort.parsers.Readline;
const parser = new Readline();
var port = new SerialPort('/dev/cu.usbmodem1441', {
  baudRate: 9600
});

function onData(data) {
  console.log(data);
  var topic = null;
  var message = null;
  if (data.trim() === "Green Tea Button is on") {
    currentTea = Meteor.call('tea.upsert', "Green Tea", currentTea, new Date(), greentea_duration = 10);
    console.log(currentTea);
  topic = "greentea";
  message = "on";
  }
  if (data.trim() === "Black Tea Button is on") {
    currentTea = Meteor.call('tea.upsert', "Black Tea", currentTea, new Date(), blacktea_duration = 10);
    console.log(currentTea);
  topic = "blacktea";
  message = "on";
  }
  if (data.trim() === "Oolong Tea Button is on") {
    currentTea = Meteor.call('tea.upsert', "Oolong Tea", currentTea, new Date(), oolongtea_duration = 10);
    console.log(currentTea);
  topic = "oolongtea";
  message = "on";
  }
  if (data.trim().indexOf("Temperature is: ") > -1) {
    var temparray = data.trim().split(":");
    console.log(temparray);
    Meteor.call('tea.update.temp', currentTea, new Date());
    console.log("waterTemp");
  topic = "temp";
  message = "current_temp";
  }
  if (data.trim() === "Water is Ready") {
    Meteor.call('tea.update.water', currentTea, new Date());
    console.log("waterReady");
  topic = "tea_water";
  message = "water_ready";
  }
  if (data.trim() === "Timer is on") {
    Meteor.call('tea.update.brew', currentTea, new Date());
    console.log("brewingNow");
  topic = "timer";
  message = "on";
  }
  if (data.trim() === "Tea is Done") {
    Meteor.call('tea.update.finish', currentTea, new Date());
    console.log("finish");
    currentTea = null;
  topic = "greentea";
  message = "done";
  }
  if (topic != null) {
    client.publish(topic, message);
  }
}

port.pipe(parser);
// our callback function must be wrapped in Meteor.bindEnvironment to avoid Fiber errors
parser.on('data', Meteor.bindEnvironment(onData));

Meteor.startup(() => {
  // code to run on server at startup
});