*~~Annoy~~ astound your Slack friends with facts about manatees.*

Features
-----------------------
* posts a fascinating fact about manatees in a specified channel on a
  configurable regular interval
* posts a fascinating fact about manatees in a specified channel when @
  mentioned

Note: the specified channel must either be public, or the bot must be
invited to the channel if it is private.

Running on the Internet
-----------------------
Manafacts is a 12 factor app that runs well on CloudFoundry. It will
probably also fun fine on Heroku and other platforms.

### Setting up a Slack bot

Follow the steps at https://api.slack.com/bot-users to set up and
install the bot to your Slack workspace. Be sure to copy your
"Bot User OAuth Access Token" for later.

### Deploying on CloudFoundry

This assumes that your have the [`cf` CLI installed](https://docs.cloudfoundry.org/cf-cli/install-go-cli.html),
and that you have an account and are signed in on a CloudFoundry
foundation, such as [PWS](https://run.pivotal.io).

1. Clone this repo with `git clone https://github.com/motevets/manafacts && cd manafacts`
1. Deploy with
   ```
   cf push manafacts \
     -i 1 \
     -k 256M \
     -m 256M \
     --var API_TOKEN <BOT USER OAUTH ACCESS TOKEN> \
     --var CHANNEL <CHANNEL IN WHICH TO POST & LISTEN> \
     --var MINUTES_BETWEEN_POSTS <MINUTES BETWEEN MANATEE FACT POSTS> \
     --var STARTING_FACT_INDEX 0
   ```

Be sure to copy the URL your app is running at.

### Finishing bot setup on Slack

Under "Event Subscriptions" in your bot's settings:

1. Enable events
1. Enter the request URL as "https://<YOUR APPS URL>/slack_webhook
1. Add bot user event "app_mention"
