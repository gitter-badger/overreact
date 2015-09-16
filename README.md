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
| `create [directory]`          | create a new react project          |
| `develop`                     | spin up a development server        |
| `generate [view,comp] [name]` | delete specified module             |
| `remove [view,comp] [name]`   | delete specified module             |
| `run [port]`                  | start the server in production mode |
