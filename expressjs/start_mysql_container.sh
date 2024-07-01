#!/bin/bash
# Copyright (c) 2024 phoi5675
#
# This software is released under the MIT License.
# https://opensource.org/licenses/MIT

#############################################################
# NOTE: DO NOT USE THIS FOR PRODUCTION. IT IS JUST A DEMO.  #
# THIS SCRIPT IS FOR LOCAL DEVELOPMENT ONLY.                #
#############################################################

# Run mysql container, without volume - this container is one-time use.
# If you want to keep data, use docker volume.
docker run -d --rm \
  -p 3306:3306 \
  -e MYSQL_DATABASE=express_db \
  -e MYSQL_USER=express_user \
  -e MYSQL_PASSWORD=password \
  -e MYSQL_ROOT_PASSWORD=rootpassword \
  --name mysql_container \
  mysql
