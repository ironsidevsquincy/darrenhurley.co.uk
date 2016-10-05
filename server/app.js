import express from 'express';
import YAML from 'yamljs';
import * as flickr from './lib/flickr';
import { shim as polyfillFind } from 'array.prototype.find';
import { polyfill as polyfillPromise } from 'es6-promise';

polyfillFind();
polyfillPromise();
const app = express();
const keys = YAML.load(`${process.env.HOME}/.keys.yml`);
const port = 3001;

app.set('views', './server/views');
app.set('view engine', 'jade');

app.use(express.static('public'));

app.get('/', (req, res, next) =>
    flickr.search('98389216@N00', keys.flickr.key, { tags: 'website', per_page: 10 })
        .then(results =>
            Promise.all(
                results.photos.photo.map(photo =>
                    flickr.getSizes(photo.id, keys.flickr.key)
                        .then(sizes => [photo, sizes.sizes.size])
                )
            )
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
        })
        .catch(next)
);

app.listen(port, () => {
    console.log(`App running at http://localhost:${port}`);
});
