#!/bin/sh
# Cache busting: stamps every site JS/CSS reference in the HTML pages with the
# current date-time (e.g. i18n.js?v=202610201530) so browsers fetch the new
# files after each deploy. Run before committing changes to JS/CSS:
#   ./bump-version.sh
set -e
cd "$(dirname "$0")"
V=$(date +%Y%m%d%H%M)
grep -rlE '(main|i18n)\.js|(style|showcase)\.css' --include='*.html' . | while read -r f; do
  sed -i.bak -E \
    -e "s#(src=\"[./]*(main|i18n)\.js)(\?v=[^\"]*)?\"#\1?v=$V\"#g" \
    -e "s#(href=\"[./]*(style|showcase)\.css)(\?v=[^\"]*)?\"#\1?v=$V\"#g" \
    "$f"
  rm -f "$f.bak"
done
echo "Asset version: $V"
