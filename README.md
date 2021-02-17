This is a dummy commit to test Codecov! DO NOT MERGE THIS IN.

Another test change. Please don't merge.

---

# proj-ucsb-cs-las

[![codecov](https://codecov.io/gh/ucsb-cs156-w21/proj-ucsb-cs-las/branch/main/graph/badge.svg)](https://codecov.io/gh/ucsb-cs156-w21/proj-ucsb-cs-las)

## Purpose

This app is a course project of <https://ucsb-cs156.github.io>, a course at [UC Santa Barbara](https://ucsb.edu).

This repo implements an application that can be used
as an information management platform for the UCSB CS Learning Assistant (LA) program.  You can learn more
about the UCSB CS LA program here:
* <https://www.cs.ucsb.edu/education/undergrad/ut>

The functions that this application will eventually support may include:
* Accessible without login:
  - A list of current LAs and their office hours
* Accessible to UCSB students/staff/faculty with ucsb login
  - A list of current LAs and their office hours along with additional information including:
    - Links to Zoom rooms, or Discord 
    - Emails
* Accessible to Admins of the LA program
  - A log of all logins to the application
  - A complete set of records of all LAs that have ever served in the program
  - The ability to do CRUD operations on LAs, Courses, Assignments of LAs to courses, Instructors, etc.
  - Ability to set up "availability" of physical rooms for office hours (after the return to in-person instruction)
  - Ability to access all information for all courses, including LA notes (see below)
* Accessible to Instructors listed in the database
  - Ability to assign LAs to their own course
  - Ability to acces notes about office hours experiences for their own course
* Accessible to LAs listed in the database
  - Ability to set their own office hours
  - Ability to sign up for in-person office hours slots
  - Ability to make notes about office hours experiences

It contains:

- Spring Boot Backend
- React Front end
- Auth0 authentication using Google
- privilege levels "not logged in", guest, member and admin, where
  - guest means you've logged in, but with a non ucsb email address
  - member means you've logged in with a ucsb email address
  - admin means you are in the list of admins
    in the `application.properties` file, or else you've been
    added to the admins table by someone that's already an
    admin.

## Getting Started

To get started with this application, you'll need to be able to
* Run it locally (i.e. on localhost)
* Deploy it to Heroku
* Get the test cases running on GitHub Actions
* See aggregrated code coverage statistics on Codecov

This application has integrations with the following third-party
services that require configuration
* Auth0.com (for authentication)
* Google (for authentication)
* A postgres database provisioned on Heroku
* A MongoDB database for login records

All of the setup steps for running the app on localhost and Heroku are described in these  file: 
* [./docs/SETUP-FULL.md](./docs/SETUP-FULL.md) if it is your first time setting up a Spring/React app with Auth0 and Google
* [./docs/SETUP-QUICKSTART.md](./docs/SETUP-QUICKSTART.md) if you've done these steps before.

## Setting up GitHub Actions (CI/CD, CodeCov)

To setup GitHub Actions so that the tests pass, you will need to configure
some _secrets_ on the GitHub repo settings page; see: [./docs/github-actions-secrets.md](./docs/github-actions-secrets.md) for details.

This file also describes the setup for Codecov

## Property file values

This section serves as a quick reference for values found in either [`secrets-localhost.properties`](./secrets-localhost.properties) and/or [`secrets-heroku.properties`](./secrets-heroku.properties).

| Property name                                                     | Heroku only? | Explanation                                                               |
| ----------------------------------------------------------------- | ------------ | ------------------------------------------------------------------------- |
| `app.namespace`                                                   |              | See `Getting Started`                                                |
| `app.admin.emails`                                                |              | A comma separated list of email addresses of permanent admin users.       |
| `app.member.hosted-domain`                                        |              | The email suffix that identifies members (i.e. `ucsb.edu` vs `gmail.com`) |
| `spring.data.mongodb.uri` |  | The URL for read only access to the MongoDB database with archived course data; see more information below. |
| `auth0.domain`                                                    |              | See `Getting Started`                                                |
| `auth0.clientId`                                                  |              | See `Getting Started`                                                |
| `security.oauth2.resource.id`                                     |              | Should always be same as `${app.namespace}`                                   |
| `security.oauth2.resource.jwk.keySetUri`                          |              | Should always be `https://\${auth0.domain}/.well-known/jwks.json`         |
| `spring.jpa.database-platform`                                    | Yes          | Should always be `org.hibernate.dialect.PostgreSQLDialect`                |
| `spring.datasource.driver-class-name`                             | Yes          | Should always be `org.postgresql.Driver`                                  |
| `spring.jpa.properties.hibernate.temp.use_jdbc_metadata_defaults` | Yes          | Should always be `false`                                                  |
| `spring.datasource.url`                                           | Yes          | Should always be `${JDBC_DATABASE_URL}`                                   |
| `spring.datasource.username`                                      | Yes          | Should always be `${JDBC_DATABASE_USERNAME}`                              |
| `spring.datasource.password`                                      | Yes          | Should always be `${JDBC_DATABASE_PASSWORD}`                              |
| `spring.jpa.hibernate.ddl-auto`                                   | Yes          | Should always be `update`                                                 |

## MongoDB URL

You'll also need a value for the MongoDB URL for read-only access to the
archived course data.

For students working on the project, you will typically not need to
set up your own instance of this database; instead the course staff
will do that for you.

However, if you are *are* the course staff, or you just want to know how
to set it up yourself,  you should consult
the repo <https://github.com/ucsb-cs156-f20/ucsb-courses-search-support-scripts> which describes the process for
setting up that database.

This url is used for the value of `spring.data.mongodb.uri`


## Enabling fixtures

You can enable fixtures (aka pre-populate the database) by running the following command:

```bash
# Un-sample the data.sql.SAMPLE file
cp src/main/resources/data.sql.SAMPLE src/main/resources/data.sql
```

You can also add fixtures via SQL statements by adding sql statements to the `data.sql` file.
