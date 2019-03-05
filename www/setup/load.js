c = new SetupController(this);

c.renderDomainForm();

$("#domainform").submit(function (e) 
{
    e.preventDefault(); // prevents normal form behavior

    c.storeDomain(false, false);
});
