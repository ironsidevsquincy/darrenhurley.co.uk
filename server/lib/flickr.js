const flickr  = require('flickrapi');

const search = (userId, api_key, opts = {}) => {
    const searchExecutor = (resolve, reject) => {
        flickr.tokenOnly(
            { api_key },
            (error, f) => {
                if (error) {
                    return reject(error);
                }
                f.photos.search(
                    Object.assign({}, opts, { user_id: userId }),
                    (err, result) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result);
                        }
                    }
                );
            }
        );
    };
    return new Promise(searchExecutor);
};

const getSizes = (photoId, api_key) => {
    const getSizesExecutor = (resolve, reject) => {
        flickr.tokenOnly(
            { api_key },
            (error, f) => {
                if (error) {
                    return reject(error);
                }
                f.photos.getSizes(
                    { photo_id: photoId },
                    (err, result) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result);
                        }
                    }
                );
            }
        );
    };
    return new Promise(getSizesExecutor);

};

export { search, getSizes };
