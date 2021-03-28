# Setup PostgreSQL and MongoDB on an Azure VM

## PostgreSQL

### Install
1. sudo apt-get update
2. sudo apt-get install postgresql

### Allow remote access
1. sudo vim /etc/postgresql/10/main/postgresql.conf
2. Add or uncomment `listen_addresses = '*'`
3. sudo nano /etc/postgresql/10/main/pg_hba.conf
4. Add the following line `host    all             all             124.181.41.89/32        md5` *\*where the ip is your public ip*
5. Restart pgsql `invoke-rc.d postgresql restart`

### Setup a password
https://serverfault.com/a/248162/148152  

1. sudo -u postgres psql postgres
2. postgres=# \password postgres
3. Enter a new password and then confirm it.

### Done
You should now be able to login remotely (I was using pgAdmin from Windows for this).

## MongoDB

### Install
https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/

1. Import the public key: `wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -`
2. Create a list file:  `echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list`
   - This is for Ubuntu 18.04, check version using `lsb_release -a` 
3. Reload the local package database: `sudo apt-get update`
4. Install MongoDb: `sudo apt-get install -y mongodb-org`
5. Pin the version to prevent automatic upgrades 
```
echo "mongodb-org hold" | sudo dpkg --set-selections
echo "mongodb-org-server hold" | sudo dpkg --set-selections
echo "mongodb-org-shell hold" | sudo dpkg --set-selections
echo "mongodb-org-mongos hold" | sudo dpkg --set-selections
echo "mongodb-org-tools hold" | sudo dpkg --set-selections
```

### Allow remote access
https://www.digitalocean.com/community/tutorials/how-to-configure-remote-access-for-mongodb-on-ubuntu-20-04

1. sudo nano /etc/mongod.conf
2. Find the `network interfaces` section
3. Find the `bindIp` value
4. Append the public ip of your vm to this address list `bindIp: 0.0.0.0`
   - *Note that this is the VM ip not the ip of the machine you plan to connect from.*
5. Restart MongoDB `sudo systemctl restart mongod`

### Add authentication
1. Connect to the instance from an ssh connection: `mongo --port 27017'
2. Create the user:
https://stackoverflow.com/a/38921949/522859
```
db.createUser(
  {
    user: "YOUR_USERNAME",
    pwd: "YOUR_PASSWORD",
    roles: [ { role: "root", db: "admin" } ]
  }
)
```
3. Restart with access control: `mongod --auth --port 27017 --dbpath /data/db1`
4. Authenticate as the user adminstrator: `mongo --port 27017 -u "YOUR_USERNAME" -p "YOUR_PASSWORD"  --authenticationDatabase "admin"`
5. Locate the commented out security heading and uncomment it.
6. Add `authorized: enabled`
```
security:
  authorization: enabled
```
7. Restart with access control: `mongod --auth --port 27017 --dbpath /data/db1`



