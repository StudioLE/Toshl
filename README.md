# Toshl Import App

Import expenses and incomes to Toshl from a csv file.

Toshl is a fantastic web service for tracking your income and expenditures but it's a little tedious manually inputting each transaction so I created this little web app to automate the process.

1. Import - Import a .csv file of your transactions from your bank account
2. Review - The app automatically scans and tags your transactions bu you can still make some manual edits if you wish
3. Submit - Authorise the app to connect to your Toshl account then you can submit your transactions straight to Toshl

Find the app at [http://toshl.studiole.uk](http://toshl.studiole.uk)

## Roadmap / To Do

UI Overhaul
- [x] Re-theme
- [ ] Home / splash page
- [x] Emphasise steps
- [x] Unify Authentication & submission
- [x] Use icons (eg trash for clear data)

Reorganisation
- [x] Hide raw
- [x] Process becomes review

Code
- [x] User icon to indicate whether authenticated
- [ ] Revoke auth method
- [ ] Sample data
- [ ] Divide incomes from expenses
- [ ] .bin file

Other
- [ ] Come up with a neat name

## Source

This app is almost entirely run on the frontend with [AngularJS](https://angularjs.org), however due to the lack of ` Access-Control-Allow-Origin` headers on the Toshl authentication API, I've had to write and host a [small controller](https://github.com/StudioLE/Toshl/blob/master/backend/server.js) to serve between the frontend and Toshl's API.

## Contributing

I'm always on the look out for collaborators so feel free to suggest new features, get in touch or just fork at will.

## Install

If you want to host your own private version or run a local version feel free to follow these [installation instructions](https://github.com/StudioLE/Toshl/blob/master/INSTALL.md).
