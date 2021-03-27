# Script usage:
#    ./update.sh $url newUsernameGoesHere $token
url=$1
username=$2
token=$3
phoneNumber=+52$(shuf -i 0-9 -n 8 | tr -d '\n')
password=Password

echo Endpoint: $url
echo Username: $username
echo PhoneNumber: $phoneNumber
echo Token: $token

curl -X PUT -H "Content-Type: Application/json" -H "Authorization: Bearer $token" \
-d "{\"username\":\"$username\",\"password\":\"$username$password\",\"email\":\"$username@test.com\",\"phoneNumber\":\"$phoneNumber\"}" \
$url
