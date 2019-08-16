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
                    var data = fs.readFileSync('employee.json');
                    // console.log(data.toString());  
                    let employee = JSON.parse(data);
                    // console.log(employee.people);
                    let people = employee.people;
                    let curr_person = ""
                    var flag = 0;
                    // console.log(employee.people[0].name);
                    for (var x in employee.people){
                        // console.log(employee.people[x].name);
                        // console.log(people[x].PresenceStatus);                        
                        // console.log(people[x].Status);

                        if(employee.people[x].Status=="0" && employee.people[x].PresenceStatus=="1"){
                            curr_person = employee.people[x].name;
                            flag = 1;
                            // console.log(employee.people[x].name);
                            employee.people[x].Status = 1;
                            break;
                        }
                    }
                    if(flag==0){
                        for (var x in employee.people){
                            employee.people[x].Status = "0";
                        }

                        for (var x in employee.people){
                            if(employee.people[x].Status=="0" && employee.people[x].PresenceStatus=="1"){
                                curr_person = employee.people[x].name;
                                employee.people[x].Status = 1;
                                break;
                            }
                        }
                    }
                // fs.writeFileSync(employee.json, JSON.stringify(employee));

                var jsonContent = JSON.stringify(employee);
                // console.log(jsonContent);
                
                fs.writeFile("employee.json", jsonContent, 'utf8', function (err) {
                    if (err) {
                        console.log("An error occured while writing JSON Object to File.");
                        return console.log(err);
                    }
                
                    // console.log("JSON file has been saved.");
                });

                console.log("Its ", curr_person, "'s turn");

  
                } catch(e) {
                    console.log('Error in reading data.txt file:', e.stack);
                }
                

                // return context.sendActivity(`It's "${ curr_person }" 's turn`);
            }
        }
    }
}

module.exports.EchoBot = EchoBot;
