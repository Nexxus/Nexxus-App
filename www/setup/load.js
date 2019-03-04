userconfig = new UserConfig();

c = new LoginController(this);

if(c.checkForToken()) 
{
    window.open(c.m.getEnvironment(), '_self');
}

c.renderLoginForm();

$("#loginform").submit(function (e) 
{
    e.preventDefault(); // prevents normal form behavior

    c.handleLogin();
});
