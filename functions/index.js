// Copyright 2018, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

process.env.DEBUG = 'actions-on-google:*';
const { DialogflowApp } = require('actions-on-google');
const functions = require('firebase-functions');
const askForConfirmation = require('./helper-intents/ask-for-confirmation');
const askForDateTime = require('./helper-intents/ask-for-datetime');
const askForPermission = require('./helper-intents/ask-for-permission');
const askForPlace = require('./helper-intents/ask-for-place');
const askForSignIn = require('./helper-intents/ask-for-sign-in');

function createActionMap() {
  let actionMap = new Map();
  for (let i = 0; i < arguments.length; i++) {
    for (let key in arguments[i]) {
      actionMap.set(key, arguments[i][key]);
    }
  }
  return actionMap;
}

exports.helperIntentExampleAction = functions.https.onRequest((request, response) => {
  const app = new DialogflowApp({request, response});
  console.log('Request headers: ' + JSON.stringify(request.headers));
  console.log('Request body: ' + JSON.stringify(request.body));

  const welcome = {
    'input.welcome': (app) => {
      app.ask('Hi there, what intent would you like to know about?');
    }
  };

  const actionMap = createActionMap(
      askForConfirmation,
      askForDateTime,
      askForPermission,
      askForPlace,
      askForSignIn,
      welcome
      );

  app.handleRequest(actionMap);
});
