let UserModel = require('../model/user');

module.exports = (app) => {

    app.get('/api/login/user', function (req, res) {
        console.log('login user...');

    });
    app.post('/api/login/user', function (req, res) {
        UserModel
            .findOne(
                {
                    username: req.body.username,
                    password: req.body.password
                },
                function (err, user) {
                    if (user) {
                        console.log("user found");
                        let { username, location } = user;
                        const cookie = {
                            username
                        };

                        res.cookie('u', cookie);
                        console.log()
                        res.json({
                            cookie,
                            user: { username, location }
                        });
                        res.end()
                    }
                    else {
                        console.log("user not found or wrong password");
                        res.json(false);
                        res.end();
                    }
                });
    });
};
