#!/bin/sh

rm -rf build_keycloak/* build/* public/keycloak_static/*
yarn keycloak

docker exec -it keycloakify \
  cp /tmp/build_keycloak/target/keycloakify-keycloak-theme-1.0.0.jar /opt/jboss/keycloak/standalone/deployments/

echo "view your theme:"
echo "http://localhost:8080/auth/realms/example/protocol/openid-connect/auth?redirect_uri=https%3A%2F%2Fexample.com&client_id=spinnaker&response_type=token"
