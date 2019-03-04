class LoginModel
{
    constructor(controller) 
    {
        this.url = "http://copiatek.com/application/api";
        this.login = "/login_check";

        this.env = "vrij.html";

        this.c = controller;
    }

    storeLoginToken(user, pass)
    {
        var form = new FormData();
        form.append("_username", user);
        form.append("_password", pass);

        $.ajax({
            "async": true,
            "crossDomain": true,
            "url": this.url + this.login,
            "method": "POST",
            "headers": {},
            "processData": false,
            "contentType": false,
            "mimeType": "multipart/form-data",
            "data": form,
            success: function(data)
            {
                let result = JSON.parse(data);
                sessionStorage.setItem("token", result.token);
                window.location.reload();
            },
            error: function() {

            }
        });
    }

    getLoginToken()
    {
        var token = sessionStorage.getItem("token");

        return token;
    }

    getEnvironment()
    {
        return this.env;
    }

    logoutUser()
    {
        sessionStorage.clear();
        window.location.reload();
    }
}
