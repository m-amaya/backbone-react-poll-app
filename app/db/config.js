var pg = require('pg');

module.exports = {
  client: function() {
    return new pg.Client({
      user: 'vfnhvzutbzgwsl',
      password: 'elYxFE1-dgIPd72uY9_9-WsiG8',
      database: 'd7f2urmltuej4j',
      port: 5432,
      host: 'ec2-54-83-36-176.compute-1.amazonaws.com',
      ssl: true
    });
  }
}