"use strict";

var _ = require("./utils/helpers");

var config = module.exports = {},
    callbacks = [];

// default data
config.logging = {};
config.testMode = false;

/**
 * Updates the Config, and triggers handler callbacks
 *
 * @param {Object} data new configuration information to set
 * @return {void}
 */
config.update = function update(data) {
  var forbidden = ["update", "subscribe", "unsubscribe"];

  Object.keys(data).forEach(function(key) {
    if (~forbidden.indexOf(key)) { delete data[key]; }
  });

  if (!Object.keys(data).length) {
    return;
  }

  _.extend(config, data);

  callbacks.forEach(function(callback) { callback(data); });
};

/**
 * Subscribes a function to be called whenever the config is updated
 *
 * @param {Function} callback function to be called with updated data
 * @return {void}
 */
config.subscribe = function subscribe(callback) {
  callbacks.push(callback);
};

/**
 * Unsubscribes a callback from configuration changes
 *
 * @param {Function} callback function to unsubscribe from changes
 * @return {void}
 */
config.unsubscribe = function unsubscribe(callback) {
  var idx = callbacks.indexOf(callback);
  if (idx >= 0) { callbacks.splice(idx, 1); }
};
