# Script usage:
#    ./update.sh $url newUsernameGoesHere $token newEmail newPassword newType newState
url=$1
username=$2
token=$3
phoneNumber=+52$(shuf -i 0-9 -n 10 | tr -d '\n')
email=$4
password=$5
type=$6
state=$7

echo Endpoint: $url
echo Username: $username
echo PhoneNumber: $phoneNumber
echo Token: $token
echo Email: $email
echo Password: $password
echo Type: $type
echo State: $state

curl -X PUT -H "Content-Type: Application/json" -H "Authorization: Bearer $token" \
-d "{\"username\":\"$username\",\"password\":\"$password\",\"email\":\"$email\",\"phoneNumber\":\"$phoneNumber\", \"type\":\"$type\", \"state\":\"$state\"}" \
$url
