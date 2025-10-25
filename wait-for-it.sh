#!/bin/sh
# wait-for-it.sh
# Usage: ./wait-for-it.sh host:port -- command

HOSTPORT=$1
shift
CMD="$@"

HOST=$(echo $HOSTPORT | cut -d: -f1)
PORT=$(echo $HOSTPORT | cut -d: -f2)

until nc -z $HOST $PORT; do
  echo "Waiting for $HOST:$PORT..."
  sleep 1
done

exec $CMD
