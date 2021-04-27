# Script usage:
#    ./create.sh $url usernameGoesHere $token 
url=$1
username=$2
token=$3
phoneNumber=+52$(shuf -i 0-9 -n 10 | tr -d '\n')
password=Password
type=$4

echo Endpoint: $url
echo Username: $username
echo PhoneNumber: $phoneNumber
echo Token: $token
echo Type: $type

curl -X POST -H "Content-Type: Application/json" -H "Authorization: Bearer $token" \
-d "{\"username\":\"$username\",\"password\":\"$username$password\",\"email\":\"$username@test.com\",\"phoneNumber\":\"$phoneNumber\", \"type\":\"$type\"}" \
$url
