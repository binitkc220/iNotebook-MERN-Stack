**iNotebook - A Cloud Notebook** is a web based app developed and designed using MERN Stack i.e, MERN Stack comprises of 4 technologies namely: MongoDB, Express, React and Node.js. It is a full login based web app. One can signup and login to use iNotebook. Users can save, edit and delete their notes after logging into their account. Notes saved by a user are private and not accessible to other accounts. Users data are fully secure. Anyone can use and enjoy using this webapp :)


Server Side

1. First install **MongoDB** 
2. Open MongoDB compass and copy the mongoURI to server/config/default.json
3. Setup server
For this, goto server folder and run following command
-> **npm init**  (and setup project)
Now, install following dependencies:
**express:** npm install express
**bcryptjs:** npm install bcrypt
**config:** npm install config
**cors:** npm install cors 
**express-validator:** npm install express-validator
**jsonwebtoken:** npm install jsonwebtoken
**mongoose:** npm install mongoose
**nodemon:** npm install nodemon

Now, server is ready. Try: "**npx nodemon index.js**" to run server and to check if any error occurs.


Client Side

1. Goto client folder
Install following dependencies:
**concurrently:** npm install concurrently
**react-router-dom:** npm i react-router-dom

Everything is ready..
Now run, "**npm run both**" inside client folder
This command will run both client and server :)
