# Script usage:
#    ./create.sh $url usernameGoesHere type
url=$1
username=$2
phoneNumber=+52$(shuf -i 0-9 -n 10 | tr -d '\n')
password=Password
type=$3

echo Endpoint: $url
echo Username: $username
echo PhoneNumber: $phoneNumber
echo Type: $type

curl -X POST -H "Content-Type: Application/json" \
-d "{\"username\":\"$username\",\"password\":\"$username$password\",\"email\":\"$username@test.com\",\"phoneNumber\":\"$phoneNumber\", \"type\":\"$type\"}" \
$url
