var express = require('express'),
    app     = express(),
    flickr  = require('flickrapi');

app.set('views', './views');
app.set('view engine', 'jade');

app.get('/photos', function (req, res) {
    flickr.tokenOnly(
        { api_key: process.env.FLICKR_API_KEY },
        function(error, f) {
            f.photos.search({
                user_id: '98389216@N00',
                tags: 'website',
                per_page: 10
            }, function (err, result) {
                var photoUrls = result.photos.photo.map(function (photo) {
                    return ['https://farm', photo.farm, '.staticflickr.com/', photo.server, '/', photo.id, '_', photo.secret, '_z.jpg'].join('');
                });
                res.render('photos', { title: 'darrenhurley.co.uk', photoUrls: photoUrls });
            });
        }
    );
});

var server = app.listen(3000, function () {
    console.log('Listening on port %d', server.address().port);
});
