#!/bin/sh

# Exit on error
set -e

# Run DB seeding or initialization
npm run initialize

# Start the dev server
npm run start:dev
