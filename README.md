#User Polling Web App

##Technology Stack

* React.js
* Backbone.js
* Node.js
* PostgreSQL

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