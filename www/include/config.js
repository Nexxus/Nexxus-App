class UserConfig {
    constructor()
    {
        this.url = localStorage.getItem("domain");
        this.api = this.url;

        this.offeredId  = 11; 
        this.acceptedId = 2;
    }
}
