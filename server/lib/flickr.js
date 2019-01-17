import { promisify } from 'util';
import flickr from 'flickrapi'

const getToken = promisify(flickr.tokenOnly)

const search = (userId, apiKey, opts = {}) => {
  return getToken({ api_key: apiKey })
    .then(f => {
      return promisify(f.photos.search)({
        ...opts,
        user_id: userId
      })
    })
}

const getSizes = (photoId, apiKey) => {
  return getToken({ api_key: apiKey })
    .then(f => {
      return promisify(f.photos.getSizes)({
        photo_id: photoId
      })
    })
}

export {
  search,
  getSizes
}
