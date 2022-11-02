# iNotebook
**iNotebook - A Cloud Notebook** is a web based app developed and designed using MERN Stack i.e, MERN Stack comprises of 4 technologies namely: MongoDB, Express, React and Node.js. It is a full login based web app. One can signup and login to use iNotebook. Users can save, edit and delete their notes after logging into their account. Notes saved by a user are private and not accessible to other accounts. Users data are fully secure. Anyone can use and enjoy using this webapp :)
<br><br>
Live app: https://www.binitkc.com.np/inotebook/
<br><br>
**Firstly Install React**

## Server Side

1. First install **MongoDB** 
2. Open MongoDB compass and copy the mongoURI to server/db.js
3. Setup server <br>
For this, goto server folder and run following command <br>
-> **npm init**  (and setup project) <br>
Now, install following dependencies: <br>
**express:** npm install express <br>
**bcryptjs:** npm install bcrypt <br>
**config:** npm install config <br>
**cors:** npm install cors <br>
**express-validator:** npm install express-validator <br>
**jsonwebtoken:** npm install jsonwebtoken <br>
**mongoose:** npm install mongoose <br>
**nodemon:** npm install nodemon <br>
Now, server is ready. Try: "**npx nodemon index.js**" to run server and to check if any error occurs.<br>


## Client Side 

1. Goto client folder
Install following dependencies:<br>
**concurrently:** npm install concurrently<br>
**react-router-dom:** npm i react-router-dom<br>

Everything is ready..
Now run, "**npm run both**" inside client folder
This command will run both client and server :)
