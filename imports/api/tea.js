import { Mongo } from 'meteor/mongo';
 
export const Tea = new Mongo.Collection('tea');
import { check } from 'meteor/check';


if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('tea', function teaPublication() {
    return Tea.find({});
  });
}

// http://docs.meteor.com/api/collections.html#Mongo-Collection-upsert
Meteor.methods({
  'tea.upsert'(type, id, start, finish) {
    check(type, String);
 
    let currentTea = Tea.upsert({
      _id: id
    },
    {
      $set: {
        type: type,
        start: start,
        finish: finish,
        updatedAt: new Date(),
      }
    });
    return currentTea.insertedId;
  },
  'tea.update.duration'(id, duration) {
    //check(duration, Number);

    Tea.update({
      _id: id
    },
    {
      $set: {
        steepingtime: duration,
        updatedAt: new Date(),
      }
    });
  },
  'tea.update.water'(id, value) {

    Tea.update({
      _id: id
    },
    {
      $set: {
        water: value,
        updatedAt: new Date(),
      }
    });
  },
  'tea.update.timer'(id, duration, start, finish) {

    Tea.update({
      _id: id
    },
    {
      $set: {
        timer: duration,
        start: start,
        finish: finish,
        updatedAt: new Date(),
      }
    });
  }
})