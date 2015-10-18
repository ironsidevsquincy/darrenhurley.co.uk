require('es6-promise').polyfill();

const express = require('express');
const app     = express();
const flickr  = require('flickrapi');
const YAML    = require('yamljs');
const keys    = YAML.load(process.env.HOME + '/.keys.yml');

import { search as flickrSearch, getSizes as flickrGetSizes } from './lib/flickr';

app.set('views', './server/views');
app.set('view engine', 'jade');

app.use(express.static('public'));

app.get('/', (req, res) => {
    flickrSearch('98389216@N00', keys.flickr.key, { tags: 'website', per_page: 10 })
        .then(results => {
            Promise.all(
                results.photos.photo.map(photo => {
                    return flickrGetSizes(photo.id, keys.flickr.key)
                        .then(sizes => [photo, sizes.sizes.size]);
                })
            )
                .then(data => {
                    const photos = data.map(([photo, sizes]) => {
                        const size = sizes.find(size => size.label === 'Medium 640');
                        return {
                            url: `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_z.jpg`,
                            width: size.width,
                            height: size.height
                        };
                    });
                    res.render(
                        'photos',
                        {
                            title: 'darrenhurley.co.uk',
                            photos
                        }
                    );
                });
        });
});

var server = app.listen(3001, () => {
    console.log(`App running at http://localhost:${server.address().port}`);
});
