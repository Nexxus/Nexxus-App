class SetupController
{
    constructor() 
    {
        this.m = new SetupModel(this);
        this.v = new SetupView();
    }

    redirectToLogin()
    {
        window.open('login.html', '_self');
    }

    renderDomainForm()
    {
        this.v.showDomainForm("#body");
    }

    getDomain()
    {
        var form = {};

        form.domain = $("#domain").val(); 

        return form;
    }

    storeDomain()
    {
        this.url = this.getDomain();

        this.m.saveDomainLocal(this.url.domain);

        console.log(localStorage.getItem("domain"));
    }
}
