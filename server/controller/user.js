const { User } = require('./../models/user');

exports.create = (req, res) => {
    const user = new User(req.body);
    user.save((err, data) => {
        if (err) res.json({ success: false });
        res.status(200).json({
            post: true,
            user: data
        });
    });
};

exports.login = async (req, res) => {
    const user = await User.findOne({ 'email': req.body.email });
    if (!user) return res.json({ isAuth: false, message: 'Aurh failed' });
    try {
        const isMatch = await user.comparePassword(req.body.password);
        if (!isMatch) return res.json({ isAuth: false, message: 'Wrong Password' });
        
        const newUser = await user.generateToken();
        res.cookie('auth', newUser.token).json({
            isAuth: true,
            id: newUser._id,
            email: newUser.email
        });

    } catch (err) {
        return res.json({
            isAuth: false,
            message: 'Wrong password'
        });
    }



};

exports.update = (req, res) => {
    User.findByIdAndUpdate(req.body._id, req.body, { new: true }, (err, data) => {
        if (err) res.status(400).send(err);
        res.json({
            success: true,
            data
        });
    })
};

exports.delete = (req, res) => {
    const id = req.query.id;
    User.findByIdAndRemove(id, (err, data) => {
        if (err) res.status(400).send(err);
        res.json({
            success: true
        });
    });
};

exports.findOne = (req, res) => {
    const id = req.query.id;
    User.findById(id, (err, data) => {
        if (err) res.status(400).send(err);
        res.send(data);
    });
};

exports.findAll = (req, res) => {
    const limit = +req.query.limit;
    const order = req.query.order;
    const skip = req.query.skip;

    User.find().skip(skip)
        .limit(limit).exec(
            (err, data) => {
                console.log('aaaa');
                if (err) res.status(400).send(err);
                res.send(data);
            }
    );
};

exports.getReviewer = (req, res)=> {
    let id = req.query.id;

    User.findById(id,(err, data)=>{
        if(err) return res.status(400).send(err);
        res.json({
            name: data.name,
            lastname: data.lastname
        });
    })
};

exports.logout = (req, res) => {
    req.user.deleteToken(req.token, (err, user) => {
        if(err) return res.status(400).send(err);
        res.sendStatus(200)
    })
}