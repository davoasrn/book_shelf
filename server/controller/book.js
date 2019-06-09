const { Book } = require('./../models/book');

exports.create = (req, res) => {
    const book = new Book(req.body);
    book.save((err, data) => {
        if (err) return res.status(400).send(err);

        res.status(200).json({
            post: true,
            bookId: data._id
        });
    })

};

exports.update = (req, res) => {
    Book.findByIdAndUpdate(req.body._id, req.body,{new:true}, (err, data) => {
        if (err) return res.status(400).send(err);
        res.json({
            success: true,
            data
        });
    });
};

exports.findAll = (req,res) => {
    let skip = parseInt(req.query.skip);
    let limit = parseInt(req.query.limit);
    let order = req.query.order

    Book.find().skip(skip).sort({_id:order}).limit(limit).exec((err, data) => {
        if(err) return res.status(400).send(err);
        res.send(data);
    });
};

exports.userPosts = (req, res) => {
    Book.find({ownerId: req.query.user}, (err, data) => {
        if (err) return res.status(400).send(err);
        res.send(data);
    });
}

exports.delete = (req, res) => {
    const id = req.query.id;
    Book.findByIdAndRemove(id, (err, doc) => {
        if (err) return res.status(400).send(err);

        res.json(true);
    })
}

exports.findOne = (req, res) => {
    let id = req.query.id;
    
    Book.findById(id, (err, data) => {
        if(err) return res.status(400).send(err);

        res.send(data);
    })
}