class SetupModel
{
    constructor(controller) 
    {
        this.c = controller;
    }

    storeDomain(url)
    {
        localStorage.setItem("domain", url);

        console.log(localStorage.setItem("domain", url));
    }
}
