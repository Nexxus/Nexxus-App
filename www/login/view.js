class LoginView 
{
    constructor() 
    {

    }

    showLoginForm(div)
    {
        var content = "";
        content += "<div id='page1' data-role='page' data-theme='a'>"
                    +"<div data-role='header' data-position='fixed' role='banner' class='ui-header ui-bar-inherit slidedown'>"
                        +"<h1 class='ui-title'>Nexxus</h1>"
                    +"</div>"
              
  
                + "<div data-role='content' data-theme='a' class='ui-content ui-body-a' role='main'>"
                    + "<h2>Welcome to Nexxus</h2>"
                    + "<form id='loginform' name='loginform'>"
                    + "<label for='username'>Username</label>"
                        + "<div class='form-group ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset'>"       
                            + "<input type='text' id='username' class='form-control' placeholder='Username'>"
                        + "</div>"
                         + "<label for='password'>Password</label>"
                        + "<div class='form-group ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset'>"
                            + "<input type='password' id='password' name='password' class='form-control' placeholder='********'>"
                        + "</div>"
                        + "<div class='form-group'>"
                            + "<button type='submit' id='btn-submit' class='ui-btn-login ui-btn'>Login</button>"
                        + "</div>"
                    + "</form>"
                    + "<hr>"
                    + "<div class='form-group'>"
                        + "<button onClick='c.clearDomainUrl()' id='btn-clear-url' class='ui-btn ui-btn-login ui-red'>Wis<br>Domein</button>"
                    + "</div>"
                + "</div>"
            +"</div>";

        $("body").html(content);
    }

}
