class UserConfig {
    constructor()
    {
        this.url = localStorage.getItem("domain");
        this.api = this.url;
    }
}
