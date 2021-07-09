#!/bin/sh

if [ ! -d "./build_keycloak" ]; then
  echo "keycloakify has not been built yet...";
  mkdir build_keycloak
fi

docker run -d \
  --name keycloak \
  -e DB_VENDOR=h2 \
  -e KEYCLOAK_USER=admin \
  -e KEYCLOAK_PASSWORD=admin \
  -e KEYCLOAK_IMPORT=/tmp/json/realm-example.json \
  -v $(pwd)/build_keycloak:/tmp/build_keycloak \
  -v $(pwd)/tools/json:/tmp/json \
  -p 8080:8080 \
  jboss/keycloak:14.0.0
