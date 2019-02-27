class FinalizeController 
{
    constructor(lc) 
    {
        this.m = new FinalizeModel(this);
        this.v = new FinalizeView();
        this.loginc = lc;
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
        this.m.adjustProductQuantities(id);
        this.v.showPhotoForm(id, this.m.getProductsFromOrder(id));
    }
  
    submitForm(id, callback) 
    {
        if (!callback) 
        {
            this.m.setOrderStatusDone(id);
            var data = $("#file-input-" + id).attr('src');

//          $("[type=file]").change(function ()
//          {
//              var file = this.files[0];
//              reader = new FileReader();
//              img = $(this).siblings('img');

//              console.log(reader.readAsDataURL(file));
//          });
        } 
        else 
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
