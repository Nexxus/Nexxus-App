class LoginController
{
    constructor() 
    {
        this.m = new LoginModel(this);
        this.v = new LoginView();
    }

    checkForDomain()
    {
        if(this.m.url == 0)
        {
            this.redirectToSetup();
        }
    }

    // redirects if token was not found
    checkForToken()
    {
        var token = this.m.getLoginToken();

        if(token)
        {
            console.log("Token set!");
            return true;
        }
        else {
            console.log("Token not set!");
            return false;
        }
    }

    redirectToLogin()
    {
        window.open('login.html', '_self');
    }

    redirectToSetup()
    {
        window.open('setup.html', '_self');
    }

    renderLoginForm()
    {
        this.v.showLoginForm("#body");
    }

    getCredentials()
    {
        var form = {};

        form.user = $("#username").val(); 
        form.pass = $("#password").val(); 

        return form;
    }

    handleLogin()
    {
        if(typeof this.getCredentials() !== 'undefined') {
            var form = this.getCredentials();
        }

        this.m.storeLoginToken(form.user, form.pass);
    }

    handleLogout()
    {
        this.m.logoutUser();
    }

}



