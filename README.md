# noxt-cli

A command-line interface for [Noxt](https://npmjs.com/package/noxt-server).

## Usage

```sh
npx noxt-cli 
npx noxt-cli &lt;recipe>
```

## Defaults
If you just run `npx noxt-cli`, it will try to find a `noxt.config.yaml` file in your current directory. If it finds one, it will use it. Otherwise, it will use the default config and try to guess some defaults based on common project structure. 

It will assume the following:
* `views = "./views"` directory for JSX files, if it exists
* `static = "./public"` directory for static files, if it exists
* `port = 3000` port number
* `hostname = "localhost"` hostname
* `recipe = "app/main"` if `./units/main.js` exists, it will be used as the recipe
* `recipe = "noxt-dev"` fallback recipe

## Configuration

You can override these defaults by creating a `noxt.config.yaml` file in your current directory. It should look like this:

```yaml
views: "./views"
static: "./public"
port: 3000
hostname: "localhost"
recipe: "app/main"
```

## Recipes and other units

Noxt uses [MLM](https://npmjs.com/package/mlm-core) to define recipes and other units that make up the noxt stack. You can extend the [noxt](https://npmjs.com/package/noxt-server) stack by creating your own units in your `./units/` directory. 

Any package names beginning with `app/` will be loaded from your `./units/` directory. 

## License
LGPL-3.0-or-later