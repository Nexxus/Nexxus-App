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
        this.v.showAfrondPopup(this.m.getOrderById(id));
    }

    renderPhotoForm() 
    {
        this.v.showPhotoForm(this.m.getTypes());
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
  
    renderAccept() 
    {
        this.m.setNextTask();
        this.v.showCurrentTask(
            this.m.getCurrentTask(),
            this.m.getTasks().length - 1,
            this.m.getTasks()
        );
        this.v.showWheel(this.m.getCurrentTask(), this.m.getTasks());
    }
  
    renderCancel() 
    {
        this.m.setNextTask();
        this.v.showCurrentTask(
          this.m.getCurrentTask(),
          this.m.getTasks().length - 1,
          this.m.getTasks()
        );
        this.v.showWheel(this.m.getCurrentTask(), this.m.getTasks());
    }
  
    goBack() 
    {
        window.open("vrij.html", "_self");
    }
}
