#!/bin/bash
cd /home/kavia/workspace/code-generation/artfusion-27226-2bf9ef49/artfusion_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

