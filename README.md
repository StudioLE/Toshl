# Import transaction data to Toshl

Toshl is a fantastic web service for tracking your income and expenditures but it's a little tedious manually inputting each transaction so I created this little web app to automate the process. It works in 4 simple steps:

1. Export a .csv file of your transactions from your bank account.
2. Open the file with the app at [https://toshl.studiole.uk](https://toshl.studiole.uk).
3. Your transactions are scanned and tagged automatically, once you've reviewed the results you can make some manual edits.
4. Hit the authorise button then submit to send your transactions straight to Toshl.

## Roadmap / To Do

[ ] Write a todo list

## Source

This app is almost entirely run on the frontend with [AngularJS](https://angularjs.org), however due to the lack of ` Access-Control-Allow-Origin` headers on the Toshl authentication API, I've had to write and host a [small controller](https://github.com/StudioLE/Toshl/blob/master/backend/server.js) to serve between the frontend and Toshl's API.

## Contributing

I'm always on the look out for collaborators so feel free to suggest new features, get in touch or just fork at will.

## Install

Installation instructions are available at [INSTALL.md](https://github.com/StudioLE/Toshl/blob/master/INSTALL.md).
