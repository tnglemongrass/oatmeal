#!/bin/bash

# this expects $LLM_SERVER_TOKEN to exist!

# export RUST_BACKTRACE=1

# ./target/release/oatmeal \
# --backend openai \
# --open-ai-url http://localhost:3001 \
# --open-ai-token "$LLM_SERVER_TOKEN" \
# --editor none --model "meta-llama/Llama-3.3-70B-Instruct"

./target/release/oatmeal \
--backend openai \
--open-ai-url https://chat.model.tngtech.com \
--open-ai-token "$LLM_SERVER_TOKEN" \
--editor none --model "meta-llama/Llama-3.3-70B-Instruct"

# ./target/release/oatmeal \
# --backend openai \
# --open-ai-url https://taia.tngtech.com/proxy/openai \
# --open-ai-token "$LLM_SERVER_TOKEN" \
# --editor none --model "gpt-4o-mini"

# ./target/release/oatmeal \
# --backend openai \
# --open-ai-url "https://api.groq.com/openai" \
# --open-ai-token "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" \
# --editor none  --model "llama-3.3-70b-versatile"