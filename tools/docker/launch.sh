#!/bin/sh

if [ ! -d "./build_keycloak" ]; then
  echo "keycloakify has not been built yet...";
  mkdir build_keycloak
fi

npm run generate:realm

docker run -d \
  --name keycloakify \
  -e DB_VENDOR=h2 \
  -e KEYCLOAK_USER=admin \
  -e KEYCLOAK_PASSWORD=admin \
  -e KEYCLOAK_IMPORT=/tmp/realms/example.generated.json \
  -v $(pwd)/build_keycloak:/tmp/build_keycloak \
  -v $(pwd)/tools/config/cli:/opt/jboss/startup-scripts \
  -v $(pwd)/tools/config/realms:/tmp/realms \
  -p 8080:8080 \
  jboss/keycloak:16.0.0
