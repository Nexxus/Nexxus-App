userConfig = new UserConfig();

loginc = new LoginController();

if(!loginc.checkForToken())
{
    loginc.redirectToLogin();
}

c = new VrijController(loginc);

c.renderTaskList();

// refresh the lists every 3 seconds
c.reloadTasklist(false);
//window.setInterval(function () { c.reloadTasklist(false); }, 3000)
