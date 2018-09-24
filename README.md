# Question-Answer Rest API

The project simulate REST API of stackoverflow question answer web service. This was made just for self-imroovement (for fun). Not for commercial use.


## Prerequisites

Things you need to install

```
Nodejs
npm
mongodb
```

## Set Up


```
# Clone repo

git clone https://vitaliytsoy@bitbucket.org/vitaliytsoy/express-qa-api.git
cd express-qa-api


# install node dependencies
npm install

# start mongo in separate terminal
mongod

# view the app
node app.js

# Note: to develop, see instructions below
```


## Usage
```
# it is up to you what tools to use
# i used Chrome app - Postman
# you can setup it on chrome web store


# nodemon will watch for file changes in the app
# and restart the server
node app.js

# now in postman make a request you want
# check out the routs.js file to see possible requests
# here is possiple requests:

# for POST and PUT request checkout models.js to make propper body for request
# use json data type in body

# where :qid is ID of your questions
# :aid is ID of your answer
# :dir can be 'up or down' for vote

# GET list of all questions
http://localhost:3000/questions

# POST add new question to collection
http://localhost:3000/questions

# GET request to pull out question with specified ID
http://localhost:3000/questions/:qid

# POST to add new answer to the specific question
http://localhost:3000/questions/:qid/answers/:aid

# PUT to update specific answer
http://localhost:3000/questions/:qid/answers/:aid

# DELETE to delete specific answer
http://localhost:3000/questions/:qid/answers/:aid

# POST to vote-(up or down) for the specific answer
http://localhost:3000/questions/:qid/answers/:aid/vote-:dir
```



## Developing
```
# it is up to you what tools to use
# i personaly prefer these

# some helpfull additional tools
npm install -g nodemon
npm install -g node-inspector


# nodemon will watch for file changes in the app
# and restart the server
nodemon --debug app.js


# node-inspector will break the application when a break point
# or `debugger` statement is reached in the JavaScript
node-inspector
```