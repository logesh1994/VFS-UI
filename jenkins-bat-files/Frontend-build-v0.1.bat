@echo on

echo "Building Outreach VFS UI Service ..."

cd C:\Jenkins\workspace\Front-End-Services-Build-Job

call npm install

@echo on
call npm run build

@echo on
call docker -H=172.18.2.50:2375 build -t 512641-vfs-ui .

echo "Building Outreach VFS UI Service Completed Successfully ..."