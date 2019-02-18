class FinalizeModel 
{
    constructor(controller) 
    {
        this.url = userConfig.api;
        this.token = sessionStorage.getItem("token");
    
        this.c = controller;

        this.tasks = [];
        this.productTypes = [];

        this.acceptedTasks = JSON.parse(sessionStorage.getItem("acceptedTasks"));

        this.current = 1;
        this.createDummyTypes();
    }

    getFinalItem() 
    {
        return sessionStorage.getItem("finalitem");
    }

    getIndexById(id)
    {
        var tasks = this.acceptedTasks;
        var needle = -1;

        for(var index=0;index<tasks.length;index++)
        {
            if(tasks[index]['id'] == id)
            {
                needle = index;
            }
        }

        return needle;
    }
  
    setOrderStatusDone(id) 
    {
        $.ajax({
            async: true,
            crossDomain: true,
            model: this,
            id: id,
            url:
                this.url +
                "/purchaseorderstatus?bearer=" +
                this.token +
                "&purchaseOrderId=" +
                id +
                "&statusId=3",
            method: "PUT",
            headers: {},
            processData: false,
            contentType: false,
            mimeType: "multipart/form-data",
            success: function(data) 
            {
                console.log(this.id);
                console.log("Order #"+this.id+" successfully submit!");
                this.model.c.submitForm(this.id, true);
            },
            error: function(xhr) {
                console.log("Order #"+this.id+" submit failed. Error: "+xhr.status);
            }
        });
    }
    
    createDummyTypes()
    {
        for (var x = 0; x <= 2; x++) 
        {
            this.productTypes[x] = [x];
            for (var y = 0; y <= 2; y++) 
            {
                this.productTypes[x][y] = 0;
            }
        }

        this.productTypes[0][1] = "Computer";
        this.productTypes[0][2] = "4";

        this.productTypes[1][1] = "Laptops";
        this.productTypes[1][2] = "3";

        this.productTypes[2][1] = "Monitors";
        this.productTypes[2][2] = "4";
    }

    getOrderById(id)
    {
        console.log(this.acceptedTasks); console.log("Entry #" + id); console.log(this.acceptedTasks[id]);
        return this.acceptedTasks[id];
    }

    getTypes()
    {
        return this.productTypes;
    }

    // returns the number of the current task
    getCurrentTask() 
    {
        return this.current;
    }
  
    // returns an array with the details about the current task
    getTasks() 
    {
        return this.tasks;
    }
  
    // changes the current task to the next
    setNextTask() 
    {
        if (this.current < this.tasks.length - 1) 
        {
            this.current++;
        } else {
            window.open("vrij.html", "_self");
        }
    }
}
