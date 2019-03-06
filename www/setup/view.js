class SetupView 
{
    constructor() 
    {

    }

    showDomainForm(div)
    {
        var content = "";
        content += "<div id='page1' data-role='page' data-theme='a'>"
                    +"<div data-role='header' data-position='fixed' role='banner' class='ui-header ui-bar-inherit slidedown'>"
                        +"<h1 class='ui-title'>Nexxus</h1>"
                    +"</div>"
              
  
                + "<div data-role='content' data-theme='a' class='ui-content ui-body-a' role='main'>"
                    + "<h2>Invullen Bedrijfsdomein</h2>"
                    + "<h4>Hiervan ontvangt u uw gegevens en opdrachten.</h4>"
                    + "<form id='domainform' name='domainform'>"
                    + "<label for='domain'>Domein</label>"
                        + "<div class='form-group ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset'>" 
                            + "<input type='text' id='domain' class='form-control' value='https://' placeholder='https://'>"
                        + "</div>"
                        + "<div class='form-group'>"
                            + "<button type='submit' id='btn-submit' class='ui-btn-login ui-btn'>Login</button>"
                        + "</div>"
                    + "</form>"
                + "</div>"
            +"</div>";

        $("body").html(content);
    }

}
