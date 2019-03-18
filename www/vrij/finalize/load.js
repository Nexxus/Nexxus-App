userConfig  = new UserConfig();
loginc  = new LoginController();

if(!loginc.checkForToken()) { loginc.redirectToLogin(); }

indexc = new VrijController(loginc);

c = new FinalizeController(loginc, indexc);

c.renderFinalForm(0);
