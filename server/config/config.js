//ahoj
// nastaveni env - v jakem jsme prostredi (development, test nebo production)
//pokud spoustime na heroku je to defaultne u nich process.env.NODE_ENV = 'production', kdyz spoustime lokalne tak NODE_ENV neexistuje a pouzije se development
// v package.json se NODE_ENV nastavuje na 'test' pokud se spousti testovaci skript na mocha testovani
const env = process.env.NODE_ENV || 'development'

// nastaveni ruznych parametru a db pro development a test (production si nastavuje heroku samo)
if (env === 'development') {
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp'
} else if (env === 'test') {
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest'
};