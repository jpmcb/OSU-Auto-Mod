# OSU-Auto-Mod
___
The Auto Mod bot implementation for the OSU Online CS Post bacc slack community

## What does this bot do?
Currently, the Auto Mod bot on the OSU Online Post Bacc CS slack doesn't do much. It tells the admins when a new channel has been created, and that's about it. This project is an adaptation of the [Slack API terms of service bot](https://github.com/slackapi/template-terms-of-service) open source project. We are looking to add a number of features to the Auto Mod in order to make our community more inclusive & dynamic as it continues to grow. This includes anonymous reporting, welcome messages, terms of service signing, etc. 

## Contribution guidelines
___
Please refer to the CONTRIBUTING.md file for the guidelines!

## Getting started
___
There are several steps required to get the slack bot up and running for local development (if you think there is a way to optimize this, submit an issue!)

##### Development Slack
1. Create an account on the development slack instance - this can be found [here](https://osu-auto-mod.slack.com)
2. Send a message to @John McBride for admin access & collaborative permissions to the development slack

##### Node JS dependencies & Local Development
1. Install ngrok globally. A nice tutorial can be found [here](https://api.slack.com/tutorials/tunneling-with-ngrok) on how ngrok works and why it makes local development of slack apps possible
2. Pull this github repository code
3. Run `npm install` to download the project dependencies

##### Environment Variables
1. Once you are on the development slack and you have admin access, enter the admin pannel and go to the Slack API webpage. It can also be found [here](https://api.slack.com) - Enter the page for the Auto Mod test bot
2. Create a NEW file in the root of your project files named `.env` exactly
3. Under the `OAuth & Permissions` tab, copy the `Bot User OAuth Access Token`
4. Use this token as the `SLACK_TOKEN` environment variable in `.env`
5. Under the `Basic Information` tab, copy the `Verification Token`
6. Use this token as the `SLACK_VERIFICATION_TOKEN` environment variable in `.env`
7. Specify a `PORT` environment variable (I usually do 8080)
8. You must also include the `AUTO_MOD` user code. This can be somewhat complicated as it requires you to interact with the Slack API through Curl with your token. [Here](https://api.slack.com/methods/users.list) is the `user.list` method that can be used with Curl to find the bot users ID 
9. Additionally, you will need to include the `ADMINS` channel. This can also be found through the API with the `channels.list` method. Can be found [here](https://api.slack.com/methods/channels.list). 
10. Further, you must include the `SLACK_TOKEN_TEST`, `SLACK_VERIFICATION_TOKEN_TEST`, `AUTO_MOD_TEST`, and `ADMINS_TEST` env variables. If you do not plan to use this in a seperate testing environment, simply enter an empty string. Refere to the `.env.sample` file for a reference environment.
11. Finally, you must include a `ENV` variable. This must ether be `TEST` or `PROD`. 

(in the future we hope to automate this further to make testing and getting set up easier for you.)

NOTE: Check out `.env.sample` for how this environment variable file should look!

##### Run the app locally!
1. Start the app with `npm start`
2. In another terminal window, start ngrok on the same local port you specified in `.env` like this: `ngrok http 8080`  -  This allows your local instance of the node microservice to be tunneled through the internet to the slack API!

##### Configure the Slack API
1. Back on the Slack API app web page, navigate to the `Events Subscriptions`
2. Under the Request URL, change the URL to `http:// xxx.ngrok.io/events` (see your ngrok instance for the specific tunnel that your node instance can be reached on)
3. Ensure that the app is verified. You're all good to go!!

NOTE: If two people are attempting to develop at the same time, on the same development slack workspace, this process will NOT work. If you run into these issues,
_*you may need to create your own development slack workspace!*_ This would require a few additionally steps, so head over to #auto_mod and let the projects owners know if there are slack ngrok collision issues! 

##### Local development roadmap
In the future, all contributors will be required to have their own development slack workspaces. As the project grows, we will begin to use the OSU-Auto-Mod slack as a "production test" envrionment before pushing up changes to the bot in the actual "production" enviroment (aka, the OSU Post Bacc slack).

###### Deployment

There are many options for deploying the bot.
The main thing to get correct are the environment variables
and the `ENV` setting that this will run.
If you are running this on the official slack, 
the variable must be set to `PROD`. 

Once the `.env` file has been configured,
simply run the node app in a VM instance,
on an App Engine, or at home! Make sure that port 8080
is exposed and reachable and then configure your production slack to use the public facing IP / domain.  

## Community guidelines
___
All contributors must follow the OSU student code of conduct 

## Where to get help
___
Join the #Auto_Mod channel on the OSU Online CS Post Bacc slack found at https://osu-cs.slack.com/
Note: You MUST have an @oregonstate.edu email to sign up for this slack

#### Current Project Owners
John McBride 
OSU Slack: `@John McBride`
Email: mcbridej@oregonstate.edu

Hunter Schallhorn
OSU Slack: `@schallhh`
Email: schallhh@oregonstate.edu
