---
layout: article
comments: true
permalink: 2024/04/19/how-to-installtao-community-in-ubuntu-debian-servers/
title: How to install TAO in Ubuntu and Debian servers (2024 - updated guide
---


# How to install TAO in Ubuntu and Debian servers (2024 - updated guide)

Many are the reason for install TAO Community [Testing Assistée par Ordinateur](https://taotesting.com).

TAO is a computer-based test platform. With TAO, you can create test. It is used by many important entities in the world.

But, how can I install TAO without problems? I'm here to help you!

> KEEP ATTENTION: the [original guide](https://www.taotesting.com/user-guide/installation-and-upgrade/ubuntu-and-debian/) isn't updated!

> WARNING!: I'm NOT RESPONSABLE of any damage caused on your computer.
> You should use a VM if you aren't installing the program for production purposes.
> KEEP NOTE: We'll install the Community version of TAO, which is updated every month.
> If you want to install the classic version, [there's my other guide]

So, let's go!

## How-to guide

### Server preparation

Make sure the server is up-to-date:
```sh
sudo apt update
sudo apt dist-upgrade
```

Once your server is updated, you will need to **install** the required packages:
```sh
sudo apt install apache2 \
php \
php-cli \
php-common \
mariadb-server \
php-xml \
php-zip \
php-curl \
php-mbstring \
libapache2-mod-php \
php-mysql \
curl \
wget \
zip \
tidy \
unzip \
npm
```

Now, install the components needed for build:
```sh
sudo apt install php-dev libmcrypt-dev php-pear
sudo pecl channel-update pecl.php.net
sudo pecl install mcrypt-1.0.7
```

Launch this command, needed for verify php version:
```sh
php -v
```

Add *mcrypt* to the extensions section of php.ini:
```sh
sudo nano /etc/php/*YOUR PHP VERSION, LIKE 8.1*/cli/php.ini
extension=mcrypt.so
```

Install *composer*, that is the most important package. Execute this commands:
```sh
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php -r "if (hash_file('sha384', 'composer-setup.php') === 'dac665fdc30fdd8ec78b38b9800061b4150413ff2e3b6f88543c636f7cd84f6db9189d43a81e5503cda447da73c7e5b6') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
php composer-setup.php
php -r "unlink('composer-setup.php');"
```

Create a new database and user for TAO (in this example, the database and username will be "tao"):
```sh
sudo su
mysql
CREATE DATABASE tao_db;
CREATE USER 'tao'@'localhost' IDENTIFIED BY 'tao';
GRANT ALL PRIVILEGES ON tao_db.* TO 'tao'@'localhost';
FLUSH PRIVILEGES;
quit
exit
```

> KEEP ATTENTION to the semicolon at the end of every command. In MySQL language, they are required.


### Apache2 configuration

Using the editor of your choice, you will need to configure the *ServerName* as well as the directory you are installing TAO in.
If you are using virtual hosts, you will need to follow the Apache instructions which are here:
```sh
sudo nano /etc/apache2/apache2.conf
```

Now, go to the latest line of code and configure *ServerName*:
```sh
ServerName <hostname or IP>
```

Search in the code the *Directory* section and configure *Directory*:
```sh
<Directory /var/www/html/tao>
        Options FollowSymLinks MultiViews
        AllowOverride all
        Allow from all
</Directory>
```

Now, after these steps, turn on the *mod-rewrite* module:
```sh
sudo a2enmod rewrite
```

Verify your Apache configuration and then restart Apache for your changes to take effect:
```sh
sudo apache2ctl configtest
sudo systemctl restart apache2
```


### Install TAO Community

Download TAO Community 2024.04.1 version and unzip it:
```sh
cd
wget https://github.com/oat-sa/tao-community/archive/refs/tags/2024.04.1.zip
unzip 2024.04.1zip
mv tao-community-2024.04 tao/
sudo mv tao /var/www/html/tao
```

Change ownership to the Apache user:
```sh
sudo chown -R www-data:www-data /var/www/html/tao
sudo chmod -R 755 ./
```

Install TAO components on the server utilizing *composer* and then change ownership of the newly created tao directory to the Apache user:
```sh
cd /var/www/html/tao
sudo composer install
sudo chown -R www-data tao
```

Install MathJax on the server if necessary:
```sh
cd /var/www/html/tao
mkdir MathJax
cd MathJax
npm install mathjax
```

You can now complete your installation either on the command line using the following command:
```sh
sudo -u www-data php tao/scripts/taoInstall.php \
--db_driver pdo_mysql \
--db_host localhost \
--db_name <db_name> \
--db_user <user> \
--db_pass <password>\
--module_namespace http://<hostname or IP>/first.rdf \
--module_url http://<hostname or IP> \
--user_login <user> \
--user_pass <password> \
-e taoCe
```

Alternatively you can install TAO in your browser by going to "http://<hostname or IP>/tao" if you have followed the instructions above. If you have not followed the above instructions for your Apache configuration you will need to adjust the URL as appropriate.
