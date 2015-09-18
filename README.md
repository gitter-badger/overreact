# Overreact

A scaffolding tool to simplify the development and deployment of a React application running on an Express server.

### Installation

`npm install -g nbreaton/overreact`

**Note:** Currently a bug with "node_modules/.bin" and "register/babel".

### Command Line Options

```
overreact [param] [options...]
```

| command                       | description                         |
|-------------------------------|-------------------------------------|
| `build [directory]`           | output static resources             |
| `create [directory]`          | create new react project            |
| `deploy [port]`               | start production server             |
| `dev [port]`                  | start development server            |
| `generate [type] [name]`      | create specified module             |
| `remove [type] [name]`        | delete specified module             |


### Directory Structure

```
.
├── app/
│   └── index.jsx    <---- * must return react or react-router element
├── assets/          <---- all files served at /assets/
├── config/
│   ├── head.html    <---- HTML <head>, generated on server
│   └── server.js    <---- * must return an Express application
├── package.json     
├── public/          <---- all files served at /
│   ├── favicon.ico
│   └── robots.txt      
├── server/          <---- NOT IMPLEMENTED
└── styles/   
    └── main.scss    <---- * main styles file

* = a required endpoint
```
