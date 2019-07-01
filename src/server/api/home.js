const UserModel = require('../model/user');
const ChainsModel = require('../model/chains')

module.exports = (app) => {

    app.post('/api/load/userOrRestaurant', function (req, res) {
        console.log("homaapi=", req.body);
        UserModel
            .findOne(
                {
                    username: req.body.userOrRestaurantTofind
                },
                function (err, user) {
                    if (user) {
                        console.log("HOME user found");
                        let { username, location, reviews, photo } = user;
                        console.log()
                        res.json({
                            user: { username, location, reviews, photo }
                        });
                        res.end()
                        return;
                    }
                    else {
                        ChainsModel
                            .findOne(
                                {
                                    name: req.body.userOrRestaurantTofind
                                },
                                function (err, restaurant) {
                                    if (restaurant) {
                                        console.log("HOME restaurant found");
                                        res.json({ restaurant });
                                        res.end();
                                        return;
                                    }
                                    else {
                                        console.log("found nothing");
                                        res.json(false);
                                        res.end();
                                    }
                                }
                            )
                    }
                }
            );
    });

    app.post('/api/load/names', async function (req, res) {
        let names = [];
        let users = [];
        let chains = [];
        try {
            users = await UserModel.find({});
            users = users.map((user) => user.username);
            console.log('users=', users);
        } catch (e) {
            console.log(e);
        }
        try {
            chains = await ChainsModel.find({});
            chains = chains.map((chain) => chain.name);
            console.log('chains=', chains);
        } catch (e) { console.log(e); }
        names = users.concat(chains);
        console.log('names=', names)
        res.json({ names });
        res.end();
    })
}
