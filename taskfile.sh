#!/bin/bash
PATH=./node_modules/.bin:$PATH

# About taskfile - https://github.com/adriancooney/Taskfile

function lint {
  eslint --max-warnings 0 $@
}

function lint:all {
  lint ./src $@
}

function typecheck {
  tsc --noEmit
}

function copy:assets {
  copyfiles -u 1 -e "**/*.js*" -e "**/*.ts*" "src/**/*" build
}

function build:clean {
  rm -rf build
}

function build:pages {
  showdown makehtml -i static/pages/seen-read/2017.md -o build/static/pages/2017.html
  showdown makehtml -i static/pages/seen-read/2018.md -o build/static/pages/2018.html
  showdown makehtml -i static/pages/seen-read/2019.md -o build/static/pages/2019.html
}

function build {
  build:clean
  tsc $@
  copy:assets
}

function start {
  node ./build/index.js
}

function start:dev {
  nodemon index.js
}

function help {
  echo "$0 <task> <args>"
  echo "Tasks:"
  compgen -A function | cat -n
}

TIMEFORMAT="Task completed in %3lR"
time "${@:-help}"
