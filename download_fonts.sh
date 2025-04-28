#!/bin/bash

# Create the destination directory if it doesn't exist
mkdir -p /Users/sourabhyadav/chowk.me/src/fonts

# Base URL for the downloads
BASE_URL="https://globalfonts.pro/d-file"

# Function to download a specific font variant and format
download_font() {
  VARIANT=$1
  FORMAT=$2
  FILENAME="MabryPro-${VARIANT}.${FORMAT}"
  OUTPUT_PATH="/Users/sourabhyadav/chowk.me/src/fonts/${FILENAME}"
  
  echo "Downloading ${FILENAME}..."
  curl -L "https://globalfonts.pro/font/mabry-pro/${VARIANT}/${FORMAT}" -o "${OUTPUT_PATH}"
  
  # Check if download was successful
  if [ -f "${OUTPUT_PATH}" ]; then
    echo "✓ Successfully downloaded ${FILENAME}"
  else
    echo "✗ Failed to download ${FILENAME}"
  fi
}

# Array of all font variants
VARIANTS=("Light" "LightItalic" "Regular" "Italic" "Medium" "MediumItalic" "Bold" "BoldItalic" "Black" "BlackItalic")

# Array of all required formats
FORMATS=("woff2" "woff" "eot" "ttf")

# Download all font variants in all formats
for VARIANT in "${VARIANTS[@]}"; do
  for FORMAT in "${FORMATS[@]}"; do
    download_font "${VARIANT}" "${FORMAT}"
    # Add a small delay to prevent rate limiting
    sleep 1
  done
done

echo "All font downloads completed. Check the /Users/sourabhyadav/chowk.me/src/fonts directory."
