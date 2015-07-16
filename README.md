#User Polling Web App

##Technology Stack

* React.js
* Backbone.js
* Node.js
* PostgreSQL

##Project Structure

* `server.js` - responsible for setting up and connecting to 
Postgres database, configuring and running express app
* `app/`
  * `route.js` - responsible for setting up the API and
  front-end routes
  * `db/`
    * `config.js` - holds configuration for connecting to a
    database hosted on Heroku Postgres. *Not included in public git repo for security purposes.*
    * `db.js` - holds methods for all database operations.

###`config.js`

If interested, you can set up the app to connect to your own
Heroku Postgres database by doing the following:

1. Set up project to deploy on Heroku.
```
$ heroku login
$ heroku create
```
2. Create a new database to add to your Heroku app.
```
$ heroku addons:create heroku-postgresql-hobby-dev
```
> You may need to wait 5-10 minutes while the database is setting
up. You can check your database's availability by going to
[https://postgres.heroku.com/databases](https://postgres.heroku.com/databases).
3. You can use the following command to view general information
about your database:
```
$ heroku pg:info
```
4. If you have `psql` installed on your local computer, you can
use it to connect to your database with the following:
```
$ heroku pg:psql
---> Connecting to DATABASE_URL
psql (9.4.4)
SSL connection (protocol: TLSv1.2, cipher: ECDHE-RSA-AES256-GCM-SHA384, bits: 256, compression: off)
Type "help" for help.

<app-name>::DATABASE=>
```
5. Once connected remotely, execute the following command to create
a table named `polls`, which will be used in the app.
```
CREATE TABLE polls(uuid char(36) UNIQUE, question varchar(100), opt1 varchar(50), opt2 varchar(50), opt3 varchar(50), opt1votes int DEFAULT 0 CHECK (opt1votes>=0), opt2votes int DEFAULT 0 CHECK (opt2votes>=0), opt3votes int DEFAULT 0 CHECK (opt3votes >= 0));
```
Make sure table created correctly:
```
SELECT * FROM polls;
```
Exit psql: `CTRL+D`.
6. Create a `app/db/config.js` file with the following contents:
```javascript
var pg = require('pg');

module.exports = {
  client: function() {
    return new pg.Client({
      user: 'your-user-here',
      password: 'your-password-here',
      database: 'your-database-here',
      port: 5432,
      host: 'your-host-here',
      ssl: true
    });
  }
}
```
> Your credentials can be found at [https://postgres.heroku.com/databases](https://postgres.heroku.com/databases),
under **Connection Settings**.

##Running the App

1. Download .zip or `git clone` repository.
2. Add `config.js` file in `app/db` file location.
3. Run `npm install` to install node modules.
4. Run `bower install` to install front-end libs.
5. Run `grunt package` to ensure src files are built.
6. Run `node server.js`. The following should output to console:

```
Magic happens on port 8000
Successfully connected to db...
```

> If port 8000 is in use, the port can be changed in server.js.


##The Setup: Backend

###Table Schema

The schema was designed to hold information that would be
necessary for a `<poll />` REACT component.
* The **uuid** is used as a unique identifier for a poll,
and is generated in node using the `node-uuid` package.
* A poll can hold up to three options, but these options will
not be enforced on the backend.
* A poll will save the votes on the three options. They will
start at 0 on default, making it unnecessary to explicity set
on POST. They will be incremented as PUT requests come in,
ensuring that votes will stay above 0.

**Table Name:** `polls`

| Col Name | Data Type | Constraints |
| -------- | --------- | ----------- |
| uuid | char(36) | UNIQUE |
| question | varchar(100) | |
| opt1 | varchar(50) | |
| opt2 | varchar(50) | |
| opt3 | varchar(50) | |
| opt1votes | int | DEFAULT 0 CHECK (opt1votes>=0) |
| opt2votes | int | DEFAULT 0 CHECK (opt2votes>=0) |
| opt3votes | int | DEFAULT 0 CHECK (opt3votes>=0) |

###REST WEB API

The REST API was built with the following operations in mind:

| HTTP Verb | Url Path | Description |
| --------- | -------- | ----------- |
| GET | /api/polls | Retrieves all polls in database. |
| POST | /api/polls | Adds a new poll in database. |
| PUT | /api/polls/:id | Updates a poll in database where `uuid=:id`. |
| DEL | /api/polls/:id | Deletes a poll in database where `uuid=:id`.|

> All responses return a JSON object, which includes all polls in the updated database.