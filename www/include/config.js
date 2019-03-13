class UserConfig {
    constructor()
    {
        this.url = localStorage.getItem("domain");
        this.api = this.url;

        this.offeredId  = 300; 
        this.acceptedId = 301;
    }
}
