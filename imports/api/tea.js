import { Mongo } from 'meteor/mongo';
 
export const Tea = new Mongo.Collection('tea');
import { check } from 'meteor/check';


if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('tea', function teaPublication() {
    return Tea.find({finish:null});
  });
}

// http://docs.meteor.com/api/collections.html#Mongo-Collection-upsert
Meteor.methods({
  'tea.upsert'(type, id, start, duration) {
    check(type, String);
 
    let currentTea = Tea.upsert({
      _id: id
    },
    {
      $set: {
        type: type,
        start: start,
        duration: duration,
        updatedAt: new Date(),
      }
    });
    return currentTea.insertedId;
  },
  'tea.update.temp'(id, value) {

    Tea.update({
      _id: id
    },
    {
      $set: {
        temp: value,
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
        waterReady: value,
        updatedAt: new Date(),
      }
    });
  },
  'tea.update.brew'(id, value) {

    Tea.update({
      _id: id
    },
    {
      $set: {
        brewingNow: value,
        updatedAt: new Date(),
      }
    });
  },
  'tea.update.finish'(id, finish) {

    Tea.update({
      _id: id
    },
    {
      $set: {
        finish: finish,
        updatedAt: new Date(),
      }
    });
  }
})