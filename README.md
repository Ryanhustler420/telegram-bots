# Telegram Bot

This application has some basic bot commands available, just hook token and you are good to go.

### How to start

1. We create a bot on telegram with `/BotFather`, fire `/newbot` command
2. Get the bot token `7616509389:AAGASxXLVOIf44KFeDS0KNQnrBHZT4Kb3CX`
3. Send this to `/bots/create` [POST]
4. Ask user to fire `/getchatid`
5. Now you have `chatid` & `token`

### Requirement

Create these branches: `master`

## **[Docker](https://hub.docker.com)** profile

| username      | Password | Image(s)                    |
| ------------- | -------- | --------------------------- |
| OgochukwuBeau | xxx      | ogochukwubeau/telegram-bots |

## **[Render](https://render.com)** profile

| email                   | Password | Image                       | Deploy |
| ----------------------- | -------- | --------------------------- | ------ |
| OgochukwuBeau@proton.me | xxx      | ogochukwubeau/telegram-bots | -      |

## Workflow Env

> You can pre create these, since these details are not tighly coupled with this repository

- WF\_<span style="color:red;">**DOCKER**</span>\_ACCOUNT_USERNAME : `ogochukwubeau`
- WF\_<span style="color:red;">**DOCKER**</span>\_ACCOUNT_PASSWORD : `xxx`
- WF\_<span style="color:red;">**DOCKER**</span>\_IMAGE_NAME : `ogochukwubeau/telegram-bots`
- WF\_<span style="color:green;">**ADMIN_PASSWORD**</span> : `abcdef`
- WF\_<span style="color:green;">**SUPABASE_URL**</span> : `https://xxx.supabase.co`
- WF\_<span style="color:green;">**SUPABASE_ANON_KEY**</span> : `jwt.goes.here`

> Once you have docker image on dockerhub

- WF\_<span style="color:green;">**RENDER**</span>\_APP_SERVICE_ID : `-`
- WF\_<span style="color:green;">**RENDER**</span>\_PROFILE_AUTH_API_TOKEN : `rnd_igmGQeXkiPVgc8OHyGJMLZqG3UX2`

## Keep in mind

- Update your repository secrets
- Make your docker image private once they published
- Use lower case for login and building docker images

### Rollback

- Todo
