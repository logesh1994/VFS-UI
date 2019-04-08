@echo on
echo "Deploying Outreach VFS UI Service ..."

call docker -H=172.18.2.50:2375 stop 512641-vfs-ui
call docker -H=172.18.2.50:2375 rm 512641-vfs-ui
call docker -H=172.18.2.50:2375 run -dit --name 512641-vfs-ui -p 10205:80 512641-vfs-ui

echo "Deploying Outreach VFS UI Service Completed Successfully ..."