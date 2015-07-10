## Install

Clone the repository

```
git clone https://github.com/StudioLE/Toshl.git toshl
```

Enter the directory and install the dependencies. For this step you'll need to have [Node.js](https://nodejs.org/) and [bower](http://bower.io/) installed.

```
cd toshl
npm install
```

Behind the scenes this will also call `bower install`.

You now need to modify the `client_id` config setting in `app/config.js`.

```
client_id: 'YOUR_TOSHL_CLIENT_ID',
```

The frontend is now ready. To reach it you can either point your webserver to the directory:

```
toshl/app
```

Or you run the bundled node dev server which will launch the frontend to `http://localhost:8000`

```
npm start
```

It's now time to setup the node.js server. Remember, this step is only required because of the lack of ` Access-Control-Allow-Origin` headers on the Toshl authentication API.

Add your `client_id` to `backend/config.js`.

```
client_id: 'YOUR_TOSHL_CLIENT_ID',
```

Now, return to the `toshl` directory and launch the node.js server.

```
sh forever.sh
```

You should now be up and running. Happy hacking.
