const express = require('express');
const app     = express();
const flickr  = require('flickrapi');
const YAML    = require('yamljs');
const keys    = YAML.load(process.env.HOME + '/.keys.yml');

app.set('views', './server/views');
app.set('view engine', 'jade');

app.use(express.static('public'));

app.get('/', (req, res) => {
    flickr.tokenOnly(
        {
            api_key: keys.flickr.key
        },
        (error, f) => {
            f.photos.search(
                {
                    user_id: '98389216@N00',
                    tags: 'website',
                    per_page: 10
                },
                (err, result) => {
                    const photoUrls = result.photos.photo.map(photo => (
                        `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_z.jpg`
                    ));
                    res.render(
                        'photos',
                        {
                            title: 'darrenhurley.co.uk',
                            photoUrls: photoUrls
                        }
                    );
                }
            );
        }
    );
});

var server = app.listen(3001, () => {
    console.log(`Listening on port ${server.address().port}`);
});
