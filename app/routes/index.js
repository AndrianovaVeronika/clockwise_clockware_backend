const authRouter = require('./auth.routes');
const cityRouter = require('./city.routes');
const clock_typeRouter = require('./clock_type.routes');
const masterRouter = require('./master.routes');
const orderRouter = require('./order.routes');
const userRouter = require('./user.routes');
const mailRouter = require('./mail.routes')

module.exports = app => {
    authRouter(app);
    cityRouter(app);
    clock_typeRouter(app);
    masterRouter(app);
    orderRouter(app);
    userRouter(app);
    mailRouter(app);
};