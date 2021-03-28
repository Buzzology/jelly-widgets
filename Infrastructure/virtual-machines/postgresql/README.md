# Setup PostgreSQL on Azure VM

## Run updates
sudo apt-get update
sudo apt-get install postgresql

## Setup postgresql.conf
1. sudo vim /etc/postgresql/10/main/postgresql.conf
2. Add or uncomment `listen_addresses = '*'`

## Update pg_hba.conf
1. sudo nano /etc/postgresql/10/main/pg_hba.conf
2. Add the following line `host    all             all             124.181.41.89/32        md5` *\*where the ip is your public ip*
3. Restart pgsql `invoke-rc.d postgresql restart`

## Setup a PostgreSQL user
https://serverfault.com/a/248162/148152  

1. sudo -u postgres psql postgres
2. postgres=# \password postgres
3. Enter a new password and then confirm it.

## Done
You should now be able to login remotely (I was using pgAdmin from Windows for this).