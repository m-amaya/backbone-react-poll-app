#Keep Calm and Poll On (a User Polling Web App)

My first web application utilizing Postgres, Backbone and React. A live demo can be found [here](https://young-spire-5586.herokuapp.com/).

##Technology Stack

* LESS
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
    database hosted on Heroku Postgres
    * `db.js` - holds methods for all database operations
* `public/`
  * `index.html` - entry point of application
  * `src/`
    * `css/` - holds LESS stylesheets
    * `js/`
      * `app.js` - initializes Backbone collection and view
      * `collection/` - holds Backbone collections used
      * `mixins/` - holds Backbone mixins used
      * `model/` - holds Backbone models used
      * `view/` - holds Backbone view and React components

##Running the App Locally

If you would like to run the app yourself, you can do the
following:

1. Download .zip or `git clone` repository.
3. Run `npm install` to install node modules.
4. Run `bower install` to install front-end libs.
5. Run `grunt package` to ensure src files are built.
6. Run `node server.js`. The following should output to console:

```
Magic happens on port 8000
Successfully connected to db...
```

##The Setup: Back-End

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

> All responses return objects in JSON format.

##The Setup: Front-End

### Model

The model has been set up to mirror the table schema.

| Attribute | Default Value |
| --------- | ------------- |
| question | "" |
| opt1 | "" |
| opt2 | "" |
| opt3 | "" |
| opt1votes | 0 |
| opt2votes | 0 |
| opt3votes | 0 |

The `idAttribute` has been set to `uuid`.

### Collection

The collection has been set up to take the above model
at the `url: http://.../api/polls`.

### View

The view fetches the collection on initialization. It first performs
a check to make sure the collection is not empty (which would keep
the page from rendering), so an initial poll is added in this case.
A listener is added to the collection to listen to changes to its 
models, which is set to re-render the view if triggered. Then, the 
view is rendered using `React.render`, which is attached to the
body of the HTML page.

### React Components

* **Poll Collection Component** - renders main content of page (header, content, footer)
* **Poll Form Component** - renders the form to add a poll to the collection
* **Poll Grid Component** - renders the container for all the polls
* **Poll Component** - renders a single poll (question, vote display, vote options)
* **Vote Display Component** - renders the container for the D3 chart
* **D3Chart Component** - renders a bar chart of data, which updates
dynamically based on number of votes for each option (returned as
an `svg` image)
* **Poll Vote Component** - responsible for the logic of updating
a vote when the corresponding option is clicked

##Extras

###`config.js`

If interested, you can set up the app to connect to your own
Heroku Postgres database by doing the following:

##### 1. Set up project to deploy on Heroku.
```
$ heroku login
$ heroku create
```

##### 2. Create a new database to add to your Heroku app.
```
$ heroku addons:create heroku-postgresql-hobby-dev
```
> You may need to wait 5-10 minutes while the database is setting
up. You can check your database's availability by going to
[https://postgres.heroku.com/databases](https://postgres.heroku.com/databases).

##### 3. You can use the following command to view general information about your database:
```
$ heroku pg:info
```

##### 4. If you have `psql` installed on your local computer, you can use it to connect to your database with the following:
```
$ heroku pg:psql
---> Connecting to DATABASE_URL
psql (9.4.4)
SSL connection (protocol: TLSv1.2, cipher: ECDHE-RSA-AES256-GCM-SHA384, bits: 256, compression: off)
Type "help" for help.

(app-name)::DATABASE=>
```

##### 5. Once connected remotely, execute the following command to create a table named `polls`, which will be used in the app.
```
CREATE TABLE polls(uuid char(36) UNIQUE, question varchar(100), opt1 varchar(50), opt2 varchar(50), opt3 varchar(50), opt1votes int DEFAULT 0 CHECK (opt1votes>=0), opt2votes int DEFAULT 0 CHECK (opt2votes>=0), opt3votes int DEFAULT 0 CHECK (opt3votes >= 0));
```
Make sure table created correctly:
```
SELECT * FROM polls;
```
Exit psql: `CTRL+D`.

##### 6. Create a `app/db/config.js` file with the following contents:
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