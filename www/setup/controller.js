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

    /**
     * Checks a domain and calls back with a valid or invalid response.
     */
    checkDomain(url)
    {
        var url = this.getDomain();

        $.ajax({
            type: 'HEAD',
            c: this,
            url: url,
            success: function(){
                console.log("ajax call successful");
                c.storeDomain(true, true);
            },
            error: function() {
                console.log("ajax call failed");
                c.storeDomain(true, false);
            }
        });
    }

    storeDomain(callback, valid)
    {
        if(!callback)
        {
            this.url = this.getDomain();
            console.log("got domain!");
        }
        else // url checked 
        {
            if(valid)
            {
                this.m.saveDomainLocal(url);
                console.log("Saved domain locally!");
            }
            else 
            {
                console.log("URL isn't valid!");
            }
        }
    }
}
