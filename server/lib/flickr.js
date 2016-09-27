import denodeify from 'denodeify';
import flickr from 'flickrapi';

const search = (userId, apiKey, opts = {}) =>
    denodeify(flickr.tokenOnly)({ api_key: apiKey })
        .then(f =>
            denodeify(f.photos.search)(
                Object.assign({}, opts, { user_id: userId })
            )
        );

const getSizes = (photoId, apiKey) =>
    denodeify(flickr.tokenOnly)({ api_key: apiKey })
        .then(f =>
            denodeify(f.photos.getSizes)({ photo_id: photoId })
        );

export { search, getSizes };
