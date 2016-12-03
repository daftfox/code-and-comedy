# Check user has specified domain name
if [ -z "$MY_DOMAIN_NAME" ]; then
    echo "Need to set MY_DOMAIN_NAME (to a letsencrypt-registered name)."
    exit 1
fi

# Configuration
echo replacing values in configuration with values from the environment
sed -i "s/___domain.name___/$MY_DOMAIN_NAME/g" /etc/nginx/nginx.conf
sed -i "s/___domain.name___/$MY_DOMAIN_NAME/g" /etc/nginx/nginx-actual.conf

# Check certbot static file location
if [ ! -d /certbot ]; then
  mkdir /certbot;
fi

# Check if dhparams.pem exists, if not generate
if [ ! -f /etc/ssl/private/dhparams.pem ]; then
  echo "Generating /etc/ssl/private/dhparams.pem"
  openssl dhparam -out /etc/ssl/private/dhparams.pem 2048
fi

# Launch nginx for initial configuration
echo "Firing up nginx in the background (this allows letsencrypt to check in)"
nginx

# Create / renew certificata
if  [ ! -d /etc/letsencrypt/live/$MY_DOMAIN_NAME ]; then
  # First run
  echo - Getting a fresh certificate
  certbot certonly --webroot --webroot-path /certbot -d $MY_DOMAIN_NAME -d www.$MY_DOMAIN_NAME --text --agree-tos --email sebastiaan.renkens@ordina.nl --rsa-key-size 4096 --verbose
else
  # Renewal
  echo - Renewing certificate
  certbot renew --no-self-upgrade
fi
echo

# Swap nginx config with actual
echo "Stopping nginx and replacing nginx.conf with nginx-actual.conf (thus enabling https)"
kill $(ps aux | grep '[n]ginx' | awk '{print $1}')
sleep 1
cp /etc/nginx/nginx-actual.conf /etc/nginx/nginx.conf
echo


# Starting supervisord and all of its child processes
echo Starting supervisord and all of its child processes
/usr/bin/supervisord -c /etc/supervisord.conf
