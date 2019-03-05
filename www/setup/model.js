class SetupModel
{
    constructor(controller) 
    {
        this.c = controller;
    }

    saveDomainLocal(url)
    {
        localStorage.setItem("domain", url + "/api");
    }
}
