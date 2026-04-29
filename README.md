# ShopStack

### FrontEnd
```js
sudo apt update && sudo apt upgrade -y
sudo apt install nginx openssl -y
git clone https://github.com/Newt20/ShopStack.git
sudo apt install npm -y
npm install # in frontend folder
npm run build
sudo mkdir -p /var/www/ShopStack-frontend
sudo cp -r dist/* /var/www/ShopStack-frontend/
sudo mkdir -p /etc/nginx/ssl
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/nginx/ssl/shopstack.key -out /etc/nginx/ssl/shopstack.crt
sudo vi /etc/nginx/sites-available/ShopStack.conf
sudo ln -s /etc/nginx/sites-available/ShopStack.conf /etc/nginx/sites-enabled/

sudo rm /etc/nginx/sites-enabled/default
sudo systemctl start nginx
sudo systemctl enable nginx
sudo systemctl status nginx
sudo systemctl reload nginx
sudo nginx -t
```


### BackEnd
```js
sudo apt update && sudo apt upgrade -y
git clone https://github.com/Newt20/ShopStack.git
cd ShopStack/backend
sudo apt install npm -y
npm install
sudo npm install -g pm2
sudo apt-get install gnupg curl
curl -fsSL https://pgp.mongodb.com/server-8.0.asc | sudo gpg -o /usr/share/keyrings/mongodb-server-8.0.gpg    --dearmor
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-8.0.gpg ] https://repo.mongodb.com/apt/ubuntu noble/mongodb-enterprise/8.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-enterprise-8.2.list
sudo apt-get update
sudo apt-get install mongodb-enterprise -y

sudo systemctl enable mongod
sudo systemctl start mongod
sudo systemctl status mongod

npm install express mongoose dotenv cors
pm2 start server.js --name shopstack-backend
```


### conf file
```js
server {
    listen 80;
    server_name _;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name _;

    ssl_certificate /etc/nginx/ssl/shopstack.crt;
    ssl_certificate_key /etc/nginx/ssl/shopstack.key;

    root /var/www/ShopStack-frontend;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }

    location /api/ {
        proxy_pass http://_:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```
