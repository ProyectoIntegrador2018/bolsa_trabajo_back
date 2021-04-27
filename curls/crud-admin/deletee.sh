# Script usage:
#    ./deletee.sh $url $token
url=$1
token=$2

echo Endpoint: $url

curl -X DELETE -H "Authorization: Bearer $token" $url
