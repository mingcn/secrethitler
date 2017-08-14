import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';

import { Rooms } from '../api/collections.js';

import './newgame.html';

Template.newgame.events({
  "click .back-btn": function() {
    Session.set("view", "startmenu");
  },
  "submit #newgame-form": function(event) {
    event.preventDefault();

    console.log(event);

    let name = event.target.name.value;
    if (!name) {
      return false;
    }

    console.log("Hello", name);
    debugger
    Meteor.call("newgame", {name: name}, (err, res) => {
      if (err) {
        console.error(err);
      }

      [roomId, playerId, code] = res;
      Meteor.subscribe("rooms", code);
      Meteor.subscribe("players", roomId, function() {
        Session.set("roomId", roomId);
        Session.set("playerId", playerId);
        Session.set("view", "lobby");
      });
    });

    return false;
  }
});