# Overreact

[![Join the chat at https://gitter.im/nbreaton/overreact](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/nbreaton/overreact?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

A scaffolding tool to simplify the development and deployment of a React application running on an Express server.

### Installation

`npm install -g nbreaton/overreact`

<br />

### Command Line Options

```
overreact [param] [options...]
```

| command                       | description                         |
|-------------------------------|-------------------------------------|
| `build [directory]`           | output static resources             |
| `create [directory]`          | create new react project            |
| `dev`                         | start development server            |
| `generate [type] [name]`      | create specified module             |
| `remove [type] [name]`        | delete specified module             |
| `run`                         | start production server             |


<br />

### Project Structure

```
.
├── app/
│   └── *index.jsx     <- must return react or react-router element
├── assets/            <- all files served at /assets/
├── public/            <- all files served at /
│   ├── favicon.ico
│   └── robots.txt      
├── node_modules/            
│   ├── *express/
│   ├── *react/
│   └── *react-router/      
├── server/           
│   ├── views/
│   │   └── head.html  <- HTML <head>, generated on server
│   └── *index.js      <- must return an Express application
├── styles/   
│   └── *index.scss    <- main styles file
└─ package.json     

* required
```
