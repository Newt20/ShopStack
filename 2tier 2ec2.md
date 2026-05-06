# FrontEnd EC2

```js
vi setup.sh
chmod +x setup.sh
./setup.sh
```


### Bash File Contents

```js
#!/bin/bash
set -e

# Update and upgrade system
sudo apt update && sudo apt upgrade -y

# Install required packages (without apt's npm)
sudo apt install -y nginx openssl git curl

# Install NVM (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

source ~/.bashrc

# Install Node.js (minimum required version for Vite)
nvm install 20.19.0
nvm use 20.19.0
nvm alias default 20.19.0

# Verify versions
node -v
npm -v

# Clone ShopStack repo
git clone https://github.com/Newt20/ShopStack.git
cd ShopStack/frontend

# Clean install dependencies and build
rm -rf node_modules package-lock.json
npm install
npm run build

# Copy build files to Nginx web root
sudo mkdir -p /var/www/ShopStack-frontend
sudo cp -r dist/* /var/www/ShopStack-frontend/

# Generate self-signed SSL certificate
sudo mkdir -p /etc/nginx/ssl
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -subj "/C=US/ST=State/L=City/O=ShopStack/CN=shopstack.local" \
  -keyout /etc/nginx/ssl/shopstack.key \
  -out /etc/nginx/ssl/shopstack.crt

# Create Nginx config file
sudo tee /etc/nginx/sites-available/ShopStack.conf > /dev/null <<EOF
server {
    listen 80;
    server_name <public ec2 ip from ip a>;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name <public ec2 ip from ip a>;

    ssl_certificate /etc/nginx/ssl/shopstack.crt;
    ssl_certificate_key /etc/nginx/ssl/shopstack.key;

    root /var/www/ShopStack-frontend;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }

    location /api/ {
    proxy_pass http://<private_ec2_ip>:5000;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    }

}
EOF

# Enable site and disable default
sudo ln -sf /etc/nginx/sites-available/ShopStack.conf /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

# Start and enable Nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# Test and reload Nginx
sudo systemctl reload nginx
sudo nginx -t

echo "✅ Frontend deployment complete. ShopStack frontend is served via Nginx with SSL."

```

# BackEnd EC2

```js
vi setup.sh
chmod +x setup.sh
./setup.sh
```


### Bash File Contents

```js
#!/bin/bash
set -e

# Update system
sudo apt-get update && sudo apt-get upgrade -y

# Install prerequisites
sudo apt-get install -y gnupg curl git build-essential

# Install NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion" 

source ~/.bashrc

# Install the latest Node 20.x (>=20.19.0)
nvm install 20.19.0
nvm use 20.19.0
nvm alias default 20.19.0


# Verify
node -v   # should show v20.19.0
npm -v    # should show a compatible npm version

# Install PM2 globally
npm install -g pm2

# Clone ShopStack repo
git clone https://github.com/Newt20/ShopStack.git
cd ShopStack/backend

# Install backend dependencies (explicitly include mongoose etc.)
npm install express mongoose dotenv cors

# Copy example env file to .env
if [ -f ".env.example" ]; then
  mv .env.example .env
  echo "✅ .env file created from .env.example"
fi

# Add MongoDB 7.0 repo 
curl -fsSL https://pgp.mongodb.com/server-7.0.asc | \
  sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor

echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] \
https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | \
sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# Install MongoDB 7.0
sudo apt-get update
sudo apt-get install -y mongodb-org

# Ensure directories exist
sudo mkdir -p /var/lib/mongodb /var/log/mongodb
sudo chown -R mongodb:mongodb /var/lib/mongodb /var/log/mongodb

# Enable and start MongoDB
sudo systemctl enable mongod
sudo systemctl start mongod
sudo systemctl status mongod --no-pager

# Seed the database (only once on fresh setup)
if [ -f "seed.js" ]; then
  echo "🌱 Seeding database..."
  node seed.js
  echo "✅ Database seeded successfully."
fi

# Start backend with PM2
pm2 start server.js --name shopstack-backend
pm2 save
pm2 startup systemd -u $USER --hp $HOME

echo "✅ Backend setup complete. Node.js 20 via NVM, MongoDB 7.0 running, ShopStack backend seeded and managed by PM2."

```
