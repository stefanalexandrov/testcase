Doesn't handle renames and deletes of files ("had too little time to implement")
!!! Traffic is not encrypted.

Needs node.js

>npm install - install dependencies
>npm start - starts the application

Usage scenario:

one instance of the application is started in one folder with only server started,
onother instance is started in a different folder with only client started.

!!!If both server and client started there will be circular updates. (2 hours was not enough to fix it)
