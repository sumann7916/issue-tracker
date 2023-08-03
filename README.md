# Welcome to Remix!

- [Remix Docs](https://remix.run/docs)

# Issue Tracker
This repository contains a Remix-Typescript-Zod-Prisma issue tracker website which has two types of users: Admin and User. Admin have the ability to create users and User have ability to create and assign task/issues to other users as well as themselves.
Forms are validated on client side as well as server side using zod-form-data library. 
When an user is assigned a task, real time notification is sent to the user using Server Sent Events. Server Sent Events instead of Websockets due to no requirement of bidirectional communication.
All the history of the changes made of an issue(i.e Status Change and Assignee is change) is tracked by creating a separate table and recording all events for update as well as create.

![sse-example](https://github.com/sumann7916/issue-tracker/assets/62978690/4d5a382d-0626-492a-9e8e-794134a4f6cd)


### Future Improvements
- Use of queue to notify users.
- More secure way of authentication as well as use of OTP for user creation.
- UI Improvements for good user experience




## Development

From your terminal:

```sh
cd docker/dev
docker compose -f dev-db.compose.yml up -d
cd ..
cd ..
npm i
npx prisma db push
npx prisma db seed
npm run dev
```

This starts your app in development mode, rebuilding assets on file changes.

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `remix build`

- `build/`
- `public/build/`

### Using a Template

When you ran `npx create-remix@latest` there were a few choices for hosting. You can run that again to create a new project, then copy over relevant code/assets from your current app to the new project that's pre-configured for your target server.

Most importantly, this means everything in the `app/` directory, but if you've further customized your current application outside of there it may also include:

- Any assets you've added/updated in `public/`
- Any updated versions of root files such as `.eslintrc.js`, etc.

```sh
cd ..
# create a new project, and pick a pre-configured host
npx create-remix@latest
cd my-new-remix-app
# remove the new project's app (not the old one!)
rm -rf app
# copy your app over
cp -R ../my-old-remix-app/app app
```

- Authors -[Suman Khadka](https://github.com/sumann7916)

