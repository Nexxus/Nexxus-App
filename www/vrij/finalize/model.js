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
    }

    getFinalItem() 
    {
        return sessionStorage.getItem("finalitem");
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

    adjustProductQuantities(id)
    {
        var currentOrder = this.getOrderById(id);

        var products = this.getProductsFromOrder(id);

        for(var i=0; i < products.length; i++)
        {
            var input = $("#afrond-quantity-" + products[i]['id']).val();

            // find current product
            var pid = this.getProductFromOrderById(id, products[i]['id']);

            console.log(pid);
        }

        // overwrite acceptedTasks
        console.log(products);
        console.log(this.acceptedTasks);
    }
    
    getOrderById(id)
    {
        var tasks = this.acceptedTasks;
        var needle = -1;

        console.log("Searching for #"+id+" in tasks..");

        for(var i=0;i<tasks.length;i++)
        {
            if(tasks[i]['id'] == id)
            {
                needle = tasks[i];
            }
        }

        return needle;
    }

    getOrderByIndex(id)
    {
        return this.acceptedTasks[id];
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
  
    getProductsFromOrder(id)
    {
        var order = this.getOrderById(id);
        
        return order['product_relations'];
    }

    getProductFromOrderById(id, pid)
    {
        var products = this.getProductsFromOrder(id);
        console.log("Getting product #"+pid+" from order #"+id+".."); 
        console.log(products);

        var needle = -1;

        for(var i=0;i<products.length;i++)
        {
            if(products[i]['id'] == id)
            {
                needle = i;
            }
        }

        return needle;

    }

    getNamesFromProducts(products)
    {
        var names = [];

        for(var i=0;i<products.length;i++)
        {
            names[i] = products[i]['product']['name'];
        }

        return names;
    }

    /** 
     * Returns the number of the current task
     */
    getCurrentTask() 
    {
        return this.current;
    }
  
    /** 
     * Returns an array with the details about the current task
     */
    getTasks() 
    {
        return this.tasks;
    }
}
