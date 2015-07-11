# PeerEvaluation
System to manage student and group evaluations from the SENG 403 course from University of Calgary.

Through this system, students are able to evaluate their teammates individually, every project iteration; and TAs and professors have access to spreadsheets summarizing the evaluations from all students.

When a student evaluates his/her team, a confirmation email is sent to the student and to TAs/Prof.

### Requirements
* node.js v0.12+
* MongoDB

### Running the system
Before running for the first time you are required to change the following parameters in config/config.js:
- Project iteration numbers
- Port
- Database settings
- Email settings

Then, run using `$ node app.js`.

When an iteration is completed, it is necessary to change the iteration number (config/config.js) and restart the server.

### Backlog
- [ ] Students registration
- [ ] Improve documentation
- [ ] Factor calculated automatically
- [ ] Admin page
