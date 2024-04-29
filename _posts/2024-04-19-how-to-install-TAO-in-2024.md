---
layout: article
comments: true
permalink: 2024/04/29/how-to-install-tao-community-in-ubuntu-debian-servers/
redirect_from: 2024/04/19/how-to-install-tao-in-ubuntu-debian-servers
title: How to install TAO in Ubuntu and Debian servers (2024 - updated guide)
---

There are many reasons to install [TAO](https://taotesting.com). 

TAO is a computer-based test platform that allows you to create tests. It is used by many important entities in the world.

TAO stands for "Testing Assistée par Ordinateur" (in French) and "Open Assessments Testing" (in English).

But, how can I install TAO without problems? I'm here to help you!

> **NOTE**: The [original guide](https://www.taotesting.com/user-guide/installation-and-upgrade/ubuntu-and-debian/) isn't updated!

> **WARNING**: I am **not responsible** for any damage caused to your computer.

> **TIP**: Use a VM if you aren't installing the program for production purposes.


## How-to guide

### Server preparation

You must install PHP 8.2, but your system will install PHP 8.1 automatically.
These commands will install PHP 8.2.

Make sure the server is up-to-date:
```sh
sudo apt update
sudo apt dist-upgrade
```

Now, install software-properties-common:
```sh
sudo apt install software-properties-common
```

Add PHP 8.2 and Apache2 ppa:
```sh
LC_ALL=C.UTF8 sudo add-apt-repository ppa:ondrej/php -y
LC_ALL=C.UTF8 sudo add-apt-repository ppa:ondrej/apache2 -y
```

You will need to **install** the required packages:
```sh
sudo apt install apache2 \
php8.2 \
php8.2-cli \
php8.2-common \
mariadb-server \
php8.2-xml \
php8.2-zip \
php8.2-curl \
php8.2-mbstring \
libapache2-mod-php8.2 \
php8.2-mysql \
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

Add *mcrypt* to the extensions section of php.ini:
```sh
sudo nano /etc/php/8.2/cli/php.ini
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
mariadb
CREATE DATABASE tao_db;
CREATE USER 'tao'@'localhost' IDENTIFIED BY 'tao';
GRANT ALL PRIVILEGES ON tao_db.* TO 'tao'@'localhost';
FLUSH PRIVILEGES;
quit
exit
```

> **WARNING**: You must pay close attention to the semicolon at the end of every command. In MySQL/MariaDB, they are required.


### Apache2 configuration

Using the editor of your choice, you will need to configure the *ServerName* as well as the directory you are installing TAO in.
If you are using virtual hosts, you will need to follow the [Apache instructions](https://httpd.apache.org):
```sh
sudo nano /etc/apache2/apache2.conf
```

Now, go to the latest line of code and configure *ServerName*:
```sh
ServerName <hostname or IP>
```

Search in the code the *Directory* section and configure *Directory*:
```sh
<Directory /var/www/html/tests>
        Options FollowSymLinks MultiViews
        AllowOverride all
        Allow from all
        Require all granted
        Order allow,deny
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


### Install TAO

I've forked the GitHub project and updated the principal package (package-tao) because it isn't correctly updated.

Download TAO via Git:
```sh
cd
git clone https://github.com/FrankVan1982/package-tao.git
mv package-tao/ tests/
sudo cp -r tests/ /var/www/html/tests
```

Change ownership:
```sh
cd /var/www/html/tests
sudo chmod -R 755 ./
```

Install TAO components on the server utilizing *composer*:
```sh
cd /var/www/html/tests
sudo composer install
```

Install MathJax on the server if necessary:
```sh
cd /var/www/html/tests
mkdir MathJax
cd MathJax
npm install mathjax
```

Create needed directories:
```sh
cd /var/www/html/tests/
sudo mkdir config
sudo chmod -R 755 config
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

Alternatively you can install TAO in your browser by going to "http://(hostname or IP)/tao" if you have followed the instructions above. If you have not followed the above instructions for your Apache configuration you will need to adjust the URL as appropriate.
