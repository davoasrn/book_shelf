const config = {
    production: {
        SECRET: process.env.SECRET,
        DATABASE: process.env.MONGODB_URI
    },
    default: {
        SECRET: 'SUPERSECRETPASSWORD987',
        DATABASE: 'mongodb://127.0.0.1:27017/booksShelf'
    }
}

exports.get = function get(env){
    return config[env] || config.default
}