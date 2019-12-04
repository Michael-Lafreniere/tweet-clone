# tweet-clone

[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/Michael-Lafreniere/tweet-clone/blob/master/LICENCE)
[![GitHub stars](https://img.shields.io/github/stars/Michael-Lafreniere/tweet-clone?style=flat-square)](https://github.com/Michael-Lafreniere/tweet-clone/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/Michael-Lafreniere/tweet-clone.svg?style=flat-square)](https://github.com/Michael-Lafreniere/tweet-clone/network)

A very simple twitter like clone. The site uses [bad-words](https://www.npmjs.com/package/bad-words) to filter user names and messages along with [express-rate-limit](https://www.npmjs.com/package/express-rate-limit) to stop flooding of messages. It will only show the last 25 messages posted and there is no verification of usernames. I made this as a proof-of-concept before moving on to a larger twitter clone with user authentication, post editing, character limiting (each message has a size limit) liking/disliking/etc of posts and more. That will be done under a different repository though to keep the projects separate.

![Tweet clone](https://github.com/Michael-Lafreniere/tweet-clone/blob/master/Screenshot.png 'image of the site')

## Technology used

Below are the primary modules I used to create this project along with the [MySQL](https://hub.docker.com/_/mysql/) database running in a [Docker](https://www.docker.com) container

| Tool                                                                   | Description                                                                                       |
| ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| [node.js](https://nodejs.org/en/)                                      | A JavaScript runtime build on Chromes V8 engine                                                   |
| [express](https://www.npmjs.com/package/express)                       | Fast, unopinionated, minimalist web framework for [node](https://nodejs.org/en/).                 |
| [ejs](https://ejs.co)                                                  | An embedded JavaScript templating language                                                        |
| [bad-words](https://www.npmjs.com/package/bad-words)                   | A javascript filter for badwords                                                                  |
| [express-rate-limit](https://www.npmjs.com/package/express-rate-limit) | Basic rate-limiting middleware for Express.                                                       |
| [MySQL](https://hub.docker.com/_/mysql/)                               | MySQL is a widely used, open-source relational database management system (RDBMS).                |
| [mysql2](https://www.npmjs.com/package/mysql2)                         | MySQL client for Node.js with focus on performance.                                               |
| [dotenv](https://github.com/motdotla/dotenv)                           | Is a zero dependency module that loads environment variables from a .env file into process.env.   |
| [nodemon](https://nodemon.io)                                          | A utility that monitors for any changes to your source code and automatically restarts the server |

## Installation/Usage

[node.js](http://nodejs.org/download/) is required to get `npm`. Use the package manager [npm](https://www.npmjs.com) to install and run this code. It is highly recommended to also have [git](https://git-scm.com) installed to make the cloning easier.

I provided a example [.env](https://github.com/Michael-Lafreniere/tweet-clone/blob/master/.env.example) file with the project

```
# Clones the repository:
git clone https://github.com/Michael-Lafreniere/tweet-clone.git

# Change into the cloned directory:
cd tweet-clone

# Install the required packages:
npm install

# Create the .env file:
touch .env

# Before carrying on, open the .env file in your favorite text editor and
# add in the required values mostly for the SQL database and IP/Port addresses

# Run the site:
npm run start

# Open a new browser tab to http://localhost:3000 (or whatever IP:Port you used)  and the site should be working.
# Please open a ticket for any issues you find so I can resolve them asap.
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
