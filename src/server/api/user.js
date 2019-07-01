let UserModel = require('../model/user');

let _handleError = function (err) {
    if (err) return console.log(err);
};

module.exports = (app) => {

    app.post('/api/register', async function (req, res) {
        console.log('app.post/api/register')
        console.log('user: ', req.body, 'is registering')
        let user = await UserModel.findOne({ username: req.body.state.username });
        if (user) {
            console.log('user exists!!')
            res.json(['Failed'])
        }
        else {
            console.log('save location: ', req.body.location)
            user = new UserModel({
                username: req.body.state.username,
                password: req.body.state.password,
                location: req.body.state.location,
                photo: {
                    name: req.body.image ? req.body.image.name : 'No Image',
                    file_type: req.body.image ? req.body.image.type : 'No Image',
                    base64: req.body.image ? req.body.image.base64 : 'No Image'
                },
                reviews: []
            })
            await user.save(user)
            res.json([])
        }


    });

    app.get('/api/load/users', function (req, res) {
        console.log('loading user array');
        UserModel.find({}, function (err, users) {
            if (users) {
                let out = users.map((user) => { return { username: user.username } })
                res.json(out);
                res.end();
            }
        });
    });

    app.put('/api/user', (req, res) => {
        console.log("update user", req.body);
        update = {}
        if (req.body.locationToSave)
            update['location'] = req.body.locationToSave;
        if (req.body.userToSave)
            update['username'] = req.body.userToSave;
        console.log("update=", update);
        UserModel
            .updateOne({ username: req.body.user.username }, { $set: update })
            .then(result => {
                const { matchedCount, modifiedCount } = result;
                if (matchedCount && modifiedCount) {
                    console.log(`Successfully update.`)
                }
                res.json(true);
                res.end();
            })
            .catch(err => {
                console.error(`Failed to update: ${err}`);
                res.json(err);
                res.end();
            });
    });

};
