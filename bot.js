// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

class EchoBot {
    // 'use strict';
    async onTurn(context) {
        // Check to see if this activity is an incoming message.
        // (It could theoretically be another type of activity.)
        if (context.activity.type === 'message' && context.activity.text) {
            // Check to see if the user sent a simple "quit" message.
            if (context.activity.text.toLowerCase() === 'quit') {
                // Send a reply.
                context.sendActivity(`Bye!`);
                process.exit();
            } else {
                // Echo the message text back to the user.
                
                const fs = require('fs');

                try {  
                    var data = fs.readFileSync('data.txt', 'utf8');
                    // console.log(data.toString());  
                    let employee = JSON.parse(data);
                    let people = employee.people;

                    console.log(people[0].name);
                    for (var x in people){
                        console.log(people[x].name);
                        console.log(people[x].PresenceStatus:);                        
                        console.log(people[x].status);
                    }
  
                } catch(e) {
                    console.log('Error in reading data.txt file:', e.stack);
                }
                

                return context.sendActivity(`I heard you say "${ context.activity.text }"`);
            }
        }
    }
}

module.exports.EchoBot = EchoBot;
