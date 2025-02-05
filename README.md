# The-Geek-Shop

### A dropshiiping store made using the MERN stack

## TO-DO

- Testing backend:
    * admin login controllers 3/3 ✅
    * admin order controller 3/3 ✅
    * admin product controller 2/3
    * user controller 3/3 ✅
    * user login controller 0/2
    * category controller 2/4
- Search Page (options and render)
- Admin dashboard:
    * Tabs ✅
    * Implement Authentication popup
    * Overview tab -> using react chart.js for graphs
    * Orders tab
    * Products tabs✅
- Dynamic shopping cart
- Payment
- Make it mobile-friendly
- Indicator amount calculation backend
- Better test coverage

##

Use the following command to add the initial super admin role:

```json
npm run seed
```

## Jest and Babel config

Added `jest.config.js` and `babel.config.json` as Jest doesn't support ES Modules (import/export). babel-jest transpiles modern JavaScript to a format Jest can understand.

## Admin Dashboard

Admin dashboard uses Material UI tab component.
