#!/bin/bash

echo "Launching server forever"
forever start -al toshl/forever.log backend/server.js
