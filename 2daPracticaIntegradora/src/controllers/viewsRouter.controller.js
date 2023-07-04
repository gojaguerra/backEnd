const iniRaiz =  (req, res) => {
    res.render('home.handlebars', {
        user: req.user
    });
};

const regRaiz = (req, res) => {
    res.render('register.handlebars');
};

const loginRaiz =(req, res) => {
    res.render('login.handlebars');
};

const profileRaiz =(req, res) => {
    res.render('profile.handlebars', {
        user: req.user,
    });
};

export {
    iniRaiz,
    regRaiz,
    loginRaiz,
    profileRaiz
}