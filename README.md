# keycloak-themes
keycloak themes in react

## development

### local

the following script is intended to create a temporary keycloak container. not meant to maintain any persistance as we are only testing the themes. keycloak will be started with an `example` realm which is where theme testing should be contained.
```sh
./tools/docker/launch.s

# run as needed
./tools/docker/writeTheme.sh
```

## troubleshooting

* This may be required in your .env `IMAGE_INLINE_SIZE_LIMIT=10` due to react-scripts setting a default maximum size limit when building for production. Found from their [webpack.config.js](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/config/webpack.config.js) file.
