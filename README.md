# Overreact

A scaffolding tool to simplify the development and deployment process of a React application running on an Express server.


### Command Line Options

```
overreact [param] [options...]
```

| command | description |
|---------|-------------|
| `create [directory]` | Creates a new react project at the specified directory. |
| `generate [view|comp] [name]` | Creates a new `.jsx` module and corresponding `.scss` file. |
| `remove [view|comp] [name]` | Deletes the `.jsx` module and corresponding `.scss` file. |
| `run [port]` | Starts the server in production mode. Default port is `3000` |
| `develop` | Spins up an easy to use development server on port `3000`. |
| `build [directory]` | Uses Webpack to build the static React application and outputs it to the specified directory. |
