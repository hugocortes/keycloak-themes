#!/bin/sh

docker exec -it keycloak \
  cp /tmp/build_keycloak/target/keycloakify-keycloak-theme-1.0.0.jar /opt/jboss/keycloak/standalone/deployments/
