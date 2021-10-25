/* ============================================================================
 * Configuration with reasonable fallbacks for everything except TOKEN
 * ========================================================================= */
require('dotenv').config();
const TOKEN = process.env.TOKEN;
const CHANNEL = process.env.CHANNEL || 'test';
const TZ = process.env.TZ || 'UTC';
const MESSAGE = process.env.MESSAGE || "The time is 13:37";

// Leave unconfigured for no greeting
const GREETING = process.env.GREETING;

/* ============================================================================
 * Remember to use `GO_LIVE=true` in .env to enable output to discord. 
 * If not, all output go to console instead! Great during development :)
 * ========================================================================= */
let GO_LIVE = false;

switch (process.env.GO_LIVE) {
  case 'true':
    console.log("GO_LIVE=true : All output go to discord.")
    GO_LIVE = true;
    break;
  default:
    console.log("GO_LIVE=false : All output go to console.")
}

/* ============================================================================
 * Create discord bot
 * ========================================================================= */
const { Client } = require('discord.js');
const bot = new Client();

/* ============================================================================
 * Login bot
 * ========================================================================= */
bot.login(TOKEN);

/* ============================================================================
 * When bot is logged in, get channel named CHANNEL and start cronjob to 
 * send message at 13:37 (In the configured timezone!)
 * ========================================================================= */
bot.on('ready', () => {

  // Loop through channel names
  bot.channels.cache.forEach(item => {

    // This is the correct channel!
    if (item.name == CHANNEL) {

      // Get channel object
      bot.channels.fetch(item.id)

        .then(channel => {

          // Greet IF we have a greeting defined
          if (GREETING) {
            say(channel, GREETING);
          }

          // Create a new cronjob which prints message in the correct channel
          const { CronJob } = require('cron');

          const cron = new CronJob('* 37 13 * * *', () => {
            say(channel, MESSAGE);
          }, null, true, TZ);

        });

    }

  });

});

/* ============================================================================
 * Helper function for local development. While GO_LIVE is not true, print to 
 * console instead of spamming discord...
 * ========================================================================= */
const say = (channel, msg) => {
  if (GO_LIVE) {
    channel.send(msg);
  } else {
    console.log(`say: ${msg}`);
  }
};