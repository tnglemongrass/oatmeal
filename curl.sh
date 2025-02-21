#!/bin/bash

  # -H 'host: https://chat.model.tngtech.com' \
  # -H 'accept: application/json' \
  # -H 'content-length: 137' \

curl -X 'POST' \
  'https://chat.model.tngtech.com/v1/chat/completions' \
  -H 'accept: */*' \
  -H 'accept-encoding: gzip' \
  -H "Authorization: Bearer $LLM_SERVER_TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{
  "messages": [
    {
      "content": "Just say '\''Hi'\''.",
      "role": "user"
    }
  ],
  "stream": false,
  "model": "meta-llama/Llama-3.3-70B-Instruct"
}'
