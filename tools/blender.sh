#!/bin/bash
# Run Blender headless (no window) with a Python script or a one-line expression.
#
#   tools/blender.sh script.py [args...]     run a script (args are visible to it after "--")
#   tools/blender.sh -e 'print(1+1)'         run a Python expression and exit
#   tools/blender.sh --version               just run Blender with the given flags
#
# Blender starts with factory settings (--factory-startup) so results do not depend on
# any user add-ons or preferences. A Python error makes the command fail (exit code 1).
set -euo pipefail

BLENDER="${BLENDER:-}"
if [ -z "$BLENDER" ]; then
  for c in /Applications/Blender.app/Contents/MacOS/Blender "$(command -v blender 2>/dev/null || true)"; do
    if [ -n "$c" ] && [ -x "$c" ]; then BLENDER="$c"; break; fi
  done
fi
if [ -z "$BLENDER" ]; then
  echo "Blender not found. Install it (brew install --cask blender) or set BLENDER=/path/to/Blender." >&2
  exit 127
fi

case "${1:-}" in
  -e) shift; exec "$BLENDER" --background --factory-startup --python-exit-code 1 --python-expr "$1" ;;
  *.py) script="$1"; shift; exec "$BLENDER" --background --factory-startup --python-exit-code 1 --python "$script" -- "$@" ;;
  *) exec "$BLENDER" --background --factory-startup --python-exit-code 1 "$@" ;;
esac
