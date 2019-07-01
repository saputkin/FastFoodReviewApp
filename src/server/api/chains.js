let ChainsModel = require('../model/chains')
const userModel = require('../model/user')
const maxDist = 6371e3;
const levenshtein = require('fast-levenshtein');

function findAverage(bathroom, staff, clean, drive, delivery, food) {
    let divisor = 4;
    if (delivery) divisor++;
    if (drive) divisor++;
    return (bathroom + staff + clean + drive + delivery + food) / divisor;
}

if (typeof (Number.prototype.toRad) === "undefined") {
    Number.prototype.toRad = function () {
        return this * Math.PI / 180;
    }
}
const sortByLocation = (location, chain) => {
    let point2 = chain.location.location;
    let point1 = location.location;
    //   console.log(point1, point2)
    var φ1 = point1.lat.toRad();
    var φ2 = point2.lat.toRad();
    var Δφ = (point2.lat - point1.lat).toRad();
    var Δλ = (point1.lng - point2.lng).toRad();

    var a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    var d = c;
    console.log(d, a, c, φ1, φ2, Δφ, Δλ)
    dist = (maxDist / 100 - d) / maxDist;
}

const sortBy = (chains, req) => {
    if (req.body.name) {
        chains = chains.sort((a, b) => levenshtein.get(a.name, req.body.name) - levenshtein.get(b.name, req.body.name))
    }
    if (req.body.location) {
        chains = chains.sort((a, b) => sortByLocation(req.body.location, b) - sortByLocation(req.body.location, a))
    }
    return chains;
}

const computeScore = (chain, location, param) => {

    let point2 = chain.location.location;
    let point1 = location.location;
    //   console.log(point1, point2)
    var φ1 = point1.lat.toRad();
    var φ2 = point2.lat.toRad();
    var Δφ = (point2.lat - point1.lat).toRad();
    var Δλ = (point1.lng - point2.lng).toRad();

    var a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    var d = c;
    console.log(d, a, c, φ1, φ2, Δφ, Δλ)
    dist = (maxDist / 100 - d) / maxDist;
    let result = ((100 - param) * dist) + (chain.average * param * 20);
    console.log(result);
    return result;
}

module.exports = (app) => {

    app.post('/api/load/chains', function (req, res) {
        console.log('In load Chains!')

        ChainsModel.find({}, function (err, chains) {
            if (chains) {
                console.log(chains)
                res.json(chains)
                res.end()
            }
        })

    })

    app.post('/api/reviews/create', function (req, res) {
        var in_rev = req.body.review.review;
        let reviewAverage = findAverage(in_rev.bathroom, in_rev.staff, in_rev.clean, in_rev.drive, in_rev.delivery, in_rev.food);
        console.log('Adding a review!')
        var newReview = {
            restaurantName: req.body.review.jointId,
            reviewerName: req.body.review.username,
            creationDate: Date.now(),
            bathroom: in_rev.bathroom,
            staff: in_rev.staff,
            clean: in_rev.clean,
            drive: in_rev.drive,
            delivery: in_rev.delivery,
            food: in_rev.food,
            average: reviewAverage,
            photos: in_rev.photos
        }
        ChainsModel.findOne({ name: req.body.review.jointId }, function (err, chain) {
            chain.average = (reviewAverage + (chain.average * chain.reviews.length)) / (chain.reviews.length + 1);
            chain.reviews.push(newReview)
            chain.save()
        })

        userModel
            .updateOne({ username: req.body.review.username }, { $push: { 'reviews': newReview } })
            .then(result => {
                const { matchedCount, modifiedCount } = result;
                if (matchedCount && modifiedCount) {
                    console.log(`Successfully update.`)
                }
                res.json(newReview)
                res.end()
            })
            .catch(e => {
                console.log("Error: ", e);

            })


    })

    app.post('/api/reviews/delete', function (req, res) {
        console.log('Deleting a review!', req.body)
        // console.log(req.body.review)
        ChainsModel.findOne({ name: req.body.review.restaurantName }, function (err, chain) {

            chain.reviews = chain.reviews.filter(rev => {
                return !((rev.creationDate.toString() === new Date(req.body.review.creationDate).toString()) && (rev.reviewerName === req.body.review.reviewerName))
            })
            chain.save()
            res.json(req.body.review)
            res.end()
        })
        // Chains_Reviews.chainsModel({name:})
    })

    app.post('/api/find/restaurant', (req, res) => {
        if (req.body.closerBetter) {
            let param = +req.body.closerBetter.param;
            ChainsModel
                .find({},
                    (err, chains) => {
                        if (chains && chains.length > 0) {
                            chains = chains.filter((b) => b.average >= req.body.average);
                            let sorted = chains.sort((a, b) => computeScore(b, req.body.closerBetter.location, param) - computeScore(a, req.body.closerBetter.location, param));
                            res.json(chains);
                            res.end();
                        }
                        else {
                            res.json(false);
                            res.end();
                        }
                    })
        }
        else {
            console.log("finding restaurant =", req.body);
            ChainsModel
                .find({},
                    (err, chains) => {
                        if (chains && chains.length > 0) {
                            chains = chains.filter((b) => b.average >= req.body.average);
                            chains = sortBy(chains, req);
                            //chains = chains.sort((a, b) => b.average - a. average)
                            res.json(chains);
                            res.end();
                        }
                        else {
                            res.json(false);
                            res.end();
                        }
                    })
        }
    })

    app.post('/api/reviews/edit', (req, res) => {
        console.log('Editing review!')

        ChainsModel.findOne({ name: req.body.review.restaurantName }, function (err, chain) {
            chain.reviews = chain.reviews.map(rev => {
                if (rev.creationDate.toString() === new Date(req.body.review.creationDate).toString()
                    && rev.reviewerName == req.body.review.reviewerName) {
                    rev.bathroom = req.body.review.bathroom
                    rev.staff = req.body.review.staff
                    rev.clean = req.body.review.clean
                    rev.drive = req.body.review.drive
                    rev.delivery = req.body.review.delivery
                    rev.food = req.body.review.food
                    rev.photos = req.body.review.photos
                    rev.average = findAverage(req.body.review.bathroom, req.body.review.staff, req.body.review.clean,
                        req.body.review.drive, req.body.review.delivery, req.body.review.food)

                }
                return rev

            })
            //calculate new average
            if (chain.reviews.length > 0) {
                chain.average = chain.reviews.reduce((acc, cur) => acc + cur.average, 0) / chain.reviews.length
            }
            chain.save()
            res.json(chain)
            res.end()
        })

        // ChainsModel.
    })
}