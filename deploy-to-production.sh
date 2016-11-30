#!/bin/bash

rsync -arve "ssh $SSH_OPTIONS" --no-perms --no-owner --no-group --delete --exclude '.git' . sre16077@code-and-comedy.westeurope.cloudapp.azure.com:/home/sre16077/cnc

ssh sre16077@code-and-comedy.westeurope.cloudapp.azure.com << EOF
  # The set -e option instructs bash to immediately exit if any command [1] has a non-zero exit status
  set -e

  # This setting prevents errors in a pipeline from being masked. If any command in a pipeline fails, that return code will be used as the return code of the whole pipeline.
  set -o pipefail

  # Changedir, set permissions
  cd /home/sre16077/cnc
  find . -type d -exec chmod a+rx {} ";"
  find . -type f -exec chmod a+r {} ";"

  # Install docker compose
  curl -L https://github.com/docker/compose/releases/download/1.7.1/docker-compose-Linux-x86_64 > ./docker-compose
  chmod u+x ./docker-compose

  # And go!
  ./docker-compose build
  ./docker-compose up -d
EOF

ssh sre16077@code-and-comedy.westeurope.cloudapp.azure.com << 'EOF'
  # Clean up
  docker rmi -f $(docker images -q -f dangling=true) || true
EOF

