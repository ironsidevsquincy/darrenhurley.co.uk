# darrenhurley.co.uk [![CircleCI](https://circleci.com/gh/ironsidevsquincy/darrenhurley.co.uk.svg?style=svg)](https://circleci.com/gh/ironsidevsquincy/darrenhurley.co.uk)

## Install

 * Requires node v0.10.40

<!-- -->

    $ make install

## Develop

Create a file in your home directory called `.keys.yml`, of the format

```
flickr:
    key: XXX
    secret: XXX
```

Then,

    $ make build run

App is running at [http://localhost:3001](http://localhost:3001)

## Deploy

    $ make deploy
