# DEPLOY STEPS

NOTE: this all has to be done on the server in order for the `@prisma/client` module to set up properly.
I'm sure there's a way I could do it, but I don't know how just yet, and I have other fish to fry...


- Clone the repo onto the server in the `home` directory (where `buddha` and `sammy` live)
- cd into `client/src/plugins` and `sudo vim axios.js`
  - change the baseUrl to `https://borrowedcarbonatoms.com`
- cd back out to `client` directory
- `sudo yarn install`
- `sudo yarn build`
- `cp -r` the build folder into the `buddha` directory
- cd into `server` directory
- `sudo yarn install`
- `sudo yarn build`
- `cp -r` the contents of the `dist` folder into the `buddha` directory
  - to move the contents instead of the directory, put an asterisk after the directory name
  - from within the `server` directory, that looks like `cp -r dist/* ../../buddha`
- cd to the `buddha` directory
- `sudo vim .env` - copy the `.env` contents from my local repo
- start the server
  - to check it out, `NODE_ENV=production node server.js`
  - to start it up with pm2 and name the pm2 instance "blog", `NODE_ENV=production pm2 server.js -n blog`