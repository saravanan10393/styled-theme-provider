"use strict";

exports.__esModule = true;


var createBroadcast = function createBroadcast(initialState) {
  var listeners = {};
  var id = 0;
  var state = initialState;

  function publish(nextState) {
    state = nextState;

    // eslint-disable-next-line guard-for-in, no-restricted-syntax
    for (var key in listeners) {
      var _listener = listeners[key];
      if (_listener === undefined) {
        // eslint-disable-next-line no-continue
        continue;
      }

      _listener(state);
    }
  }

  function subscribe(listener) {
    var currentId = id;
    listeners[currentId] = listener;
    id += 1;
    listener(state);
    return currentId;
  }

  function unsubscribe(unsubID) {
    listeners[unsubID] = undefined;
  }

  return { publish: publish, subscribe: subscribe, unsubscribe: unsubscribe };
};
/**
 * Creates a broadcast that can be listened to, i.e. simple event emitter
 *
 * @see https://github.com/ReactTraining/react-broadcast
 */

exports.default = createBroadcast;