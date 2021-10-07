# DEPLOY STEPS

NOTE: this all has to be done on the server in order for the `@prisma/client` module to set up properly.
I'm sure there's a way I could do it, but I don't know how just yet, and I have other fish to fry...
ALSO NOTE: for now, this has to be done as `root` user because `yarn install` fails because for some reason prisma thinks the main user is using an older version of Node (`node -v` says `v14.18.0`, so iono what's up widat)

- If the repo isn't on the server, clone it into the `home` directory
- Otherwise, just git pull
  - either way, you'll need the username and token for your GitHub account
- cd into `client/src/plugins` and `sudo vim axios.js`
  - change the baseUrl to `https://borrowedcarbonatoms.com`
- cd back out to `client` directory
- `sudo yarn install`
- `sudo yarn build`
- `cp -r` the build folder into the main directory
- cd into `server` directory
- `sudo yarn install`
- `sudo yarn build`
- `cp -r` the contents of the `dist` folder into the main directory
  - to move the contents instead of the directory, put an asterisk after the directory name
  - from within the `server` directory, that looks like `cp -r dist/* ../../<main directory>`
- `cp -r` the `node_modules` from the `server` directory into the main directory
- cd to the main directory
- `sudo vim .env` - add the `.env` contents
  - you may not need to do this (unless the entries have changed), depending on if you deleted it deliberately - it seems to evade the usual `rm -rf` command somehow, unless I'm trippin.
- start the server
  - to check it out, `NODE_ENV=production node server.js`
  - to start it up with pm2 and name the pm2 instance "blog", `NODE_ENV=production pm2 start server.js -n blog`