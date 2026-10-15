#!/bin/sh
# Builds the site for the IIIT Delhi web server.
#   ./build.sh
# Then copy everything inside _site/ to the www folder on the server (see "Publishing" in README.md).
set -e
cd "$(dirname "$0")"

JEKYLL_ENV=production bundle exec jekyll build

# The preview (jekyll serve) writes local addresses into links, the sitemap and search-engine tags.
# Make sure none are left, e.g. because the preview was still running and rebuilt _site.
if grep -rIlq -e "localhost:4000" -e "0.0.0.0:4000" -e "127.0.0.1:4000" _site; then
  echo "Stopped: _site still contains local preview addresses." >&2
  echo "Stop 'bundle exec jekyll serve' (Ctrl+C) and run ./build.sh again." >&2
  exit 1
fi

echo
echo "Ready: copy the contents of _site/ to the www folder on the server."
