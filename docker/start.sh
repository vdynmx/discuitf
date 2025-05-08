#!/bin/bash

admin_user=${admin_user}
echo "${admin_user}"
echo "Waiting for user '${admin_user}' to appear in database..."

while true; do
  EXISTS=$(mysql discuit  -e  "SELECT id FROM users WHERE username = '${admin_user}';")
  if [ "$EXISTS" !=  "" ]; then
    echo "User '$admin_user'  found in database."
    break
  else 
     pkill discuit
     /app/discuit serve & 
     echo "Hello ${admin_user}"
     echo "sleep 20 s"
     sleep 20
  fi
echo "starting out of the loop"
echo "$EXISTS"
echo "Making user ${user_admin} admin"
mysql discuit  -e  "UPDATE users SET is_admin = 1 WHERE id = (SELECT id FROM users WHERE username = '${admin_user}' );"
echo "starting APP"
/app/discuit serve 
done
