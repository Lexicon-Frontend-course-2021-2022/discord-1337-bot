# discord-1337-bot

A simple discord bot that tells you when it's 13:37. You know why :D

## Configuration
Create an `.env` file contaning the requred keys/values, or use other means to feed them to the bot. For example, when deploying to heroku; set `Config Vars` for your app.

```
TOKEN=<Your bot token here>
CHANNEL=<Name of discord channel to put messages in>
MESSAGE=<The message to print at 13:37>
GREETING=<The message to print when bot logs in> (Leave blank for no greeting on startup)
TZ=<Timezone> (ie. CET for Central European etc.)
GO_LIVE=<true|false>
```