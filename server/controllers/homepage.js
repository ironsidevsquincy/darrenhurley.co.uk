import YAML from 'yamljs';

import * as flickr from '../lib/flickr';

const keys = YAML.load(`${process.env.HOME}/.keys.yml`);

export default (req, res, next) => {
    flickr.search('98389216@N00', keys.flickr.key, { tags: 'website', per_page: 10 })
        .then(results => {
            return Promise.all(
                results.photos.photo.map(photo => {
                    return flickr.getSizes(photo.id, keys.flickr.key)
                        .then(sizes => [photo, sizes.sizes.size]);
                })
            )
        })
        .then(data => {
            const photos = data.map(([photo, sizes]) => {
                const size = sizes.find(size => size.label === 'Medium 640');
                return {
                    url: `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_z.jpg`,
                    width: size.width,
                    height: size.height
                };
            });
            res.render('photos', {
                title: 'photos',
                photos
            });
        })
        .catch(next);
};
