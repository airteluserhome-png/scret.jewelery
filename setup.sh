#!/bin/bash

# Move the generated image from artifacts to public directory
echo "Setting up assets..."
cp "/Users/rahul/.gemini/antigravity/brain/9344f987-c7f7-4031-abc2-78087751499d/secretly_model_v1_1768834320783.png" "./public/hero-image.png"

# Install dependencies
echo "Installing dependencies..."
npm install

# Start the development server
echo "Starting development server..."
npm run dev
