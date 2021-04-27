# Script usage:
#    ./read.sh $url $token
url=$1
token=$2

#echo Endpoint: $url
#echo Token: $token

curl -s -X GET -H "Authorization: Bearer $token" $url
