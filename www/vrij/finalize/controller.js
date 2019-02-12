class FinalizeController 
{
    constructor(vrijcontroller) 
    {
        this.m = new FinalizeModel(this);
        this.v = new FinalizeView();
        this.indexc = vrijcontroller;
    
        this.id = this.m.getFinalItem();
        this.showTasks();
    }
  
    renderFinalForm() 
    {
        indexc.v.showHeader("#header");
    
        this.v.showQuantityForm();
    
        var id = this.m.getFinalItem();

        this.m.getAcceptedTasks();
    }
  
    renderPhotoForm() 
    {
        this.v.showPhotoForm();
    }
  
    submitForm(callback) 
    {
        if (!callback) 
        {
            this.m.setOrderStatusDone(this.id);
        } else 
        {
            alert("Ophaaldienst afgerond!");
            this.goBack();
        }
    }
  
    showTasks() 
    {
        this.v.showCurrentTask(1, this.m.getTasks().length - 1, this.m.getTasks());
        this.v.showWheel(1, this.m.getTasks());
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
