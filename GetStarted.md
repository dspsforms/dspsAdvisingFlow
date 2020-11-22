# Get Started


## Prerequisites

You need to install the following if they are not already on your system.
* node. we have tested it with version 12.16.3
* @angular/cli  we have tested it with version 8.2.0 but 10+ should work. avoid version 9.
* mongodb. we have tested it with 4.0.0
* @ionic/cli . we have tested it with version 6.4.3
* forever

Please Google, or use another internet search engine, for instructions on how to install these on your system.

The bash scripts will run on mac and linux. For Windows, take a look at the .sh files, and create equivalent .bat files. 


## Download the code

1. Fork this repository. 

2. clone the new repository (with your username) onto your system:

    git clone ....

3. There are three different modules: dspsmisc-backend, dspsmisc-ionic, and dspsmisc-print. Go to *each* of these directories in a terminal, and execute:

    npm install

Sometimes, this install can fail because different open source systems move in different directions. If it does, try adjusting the version numbers, or Google the error message. Also, please let us know.

4. Set the environment variables:

Go to dspsmisc-ionic/src/environments and dspsmisc-print/src/environments,  do the following:

Copy environment.ts.template -> environment.ts
Copy environment.prod.ts.template -> environment.prod.ts

Then, open the files environment.prod.ts and environment.ts in your favorite text editor (such as Visual Studio Code). Do not use Word or similar programs because they may insert invisible characters. Supply the values that you see in those files. 

Next, go to dspsmisc-backend/ and copy env.template -> .env  (notice the period). Open .env in a text editor, and supply the values for your system. 

5. In a terminal, from the folder dspsmisc-ionic, execute
    ./buildProd.sh

Also, from dspsmisc-print, execute
     ./buildProd.sh

These two take a little extra RAM. In the AWS free-tier server, this build can take a long time because of memory constraints. If you have more memory on your server, you shouldn't see any issue. 

An alternative is to build it on your laptop or desktop (which typically has a lot more RAM), and transfer the transpiled javascript files to your server. 

6. In a terminal, from the folder dspsmisc-backend, copy startProdServer.sh.template to startProdServer.sh. If you wish, you can change the names of the log files in startProdServer.sh

Then execute:
    ./startProdServer.sh

This will start your server. 

6a. First time you run the server, you need to create an admin user for your system. 

Open .env and set FIRST_TIME=1

Next, copy dspsmisc-backend/misc/once.js to dspsmisc-backend/misc/once.tmp.js

Open the file once.tmp.js in a text editor. Add an admin user, and  password. 

From dspsmisc-backend, run ./startProdServer.sh


You should see a message that a user was created. Stop the server with a control-C.

Delete the file once.tmp.js that you just created.

In .env, set FIRST_TIME=0

Restart the server:  ./startProdServer.sh

7.
Point your browser to yourServer:3001  or whatever port you have set in .env

Login as the admin user you created in Step 6a. 

Then create other staff and faculty users. 

Create forms for your students. They don't need to be on your system for you to create a form. However, once a student creates an account, they will be able to see the forms, sign them, etc.

8. If you run into issues, please contact us. We are here to help.




