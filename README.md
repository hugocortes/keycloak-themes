# keycloak-themes

keycloak themes in react

## development

### local

installation:

1. `npm i -g ts-node` required to generate client tsx

the following script is intended to create a temporary keycloak container. not meant to maintain any persistance as we are only testing the themes. keycloak will be started with an `example` realm which is where theme testing should be contained. username and password is `admin` / `admin`.

```sh
./tools/docker/launch.sh

# run as needed after making theme updates
./tools/docker/writeTheme.sh
```

file generation:

1. download assets and place in `tools/generator/assets` with `{client}/*` format
2. run `npm run generate` or `ts-node --compiler-options "{\"module\":\"commonjs\"}" tools/generator` to generate ts files

when clients have been configured on keycloak instance:

1. go to https://www.keycloak.org/app/ . Click "Save" and then "Sign in".

## deployment

when ready to deploy, run: `npm run keycloak`. this will create a `.jar` file (build_keycloak/target/keycloakify-keycloak-theme-1.0.0.jar) which will need to be added to your keycloak's theme directory.

## troubleshooting

- This may be required in your .env `IMAGE_INLINE_SIZE_LIMIT=10` due to react-scripts setting a default maximum size limit when building for production. Found from their [webpack.config.js](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/config/webpack.config.js) file.
- ts-node must be ran with `--compiler-options "{\"module\":\"commonjs\"}"` when generating ts files as nextjs is rewriting module to esnext
- `node-sass` was replaced with `sass` as m1 mac was not supported and ran into installation issues
