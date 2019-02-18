class FinalizeController 
{
    constructor() 
    {
        this.m = new FinalizeModel(this);
        this.v = new FinalizeView();
    }
  
    /**
     * Renders wheel and details
     */
    renderFinalForm(id) 
    {
        console.log("Rendering final form...");
        indexc.v.showHeader("#header");
        
        // retrieve tasks
        var tasks = this.m.acceptedTasks;

        // render page
        this.v.showWheel(id, tasks);
        this.v.showCurrentTask(id, tasks);
    }

    /**
     * Renders and shows popup with form to progress
     */
    renderAfrondPopup(id)
    {
        this.v.showAfrondPopup(this.m.getOrderByIndex(id));
    }

    renderPhotoForm(id) 
    {
        this.v.showPhotoForm(this.m.getProductsFromOrder(id));
    }
  
    submitForm(id, callback) 
    {
        if (!callback) 
        {
            this.m.setOrderStatusDone(id);
        } else 
        {
            var index = this.m.getIndexById(id);
            this.renderFinalForm(index+1);
            this.closePopup();
        }
    }

    closePopup()
    {
        this.v.closePopup();
    }
  
    goBack() 
    {
        window.open("vrij.html", "_self");
    }
}
