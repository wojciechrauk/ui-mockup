var CONST = {
    flags:{
        1: "spicy",
        2: "meat"
    },

    ingredients: [
        {name: "Pepperoni", flags:[2], price: 2}, // 0
        {name: "Pepper", flags:[1], price: 1},    // 1
        {name: "Cheese", flags:[], price: 3},     // 2 ...
        {name: "Chilli", flags:[1], price: 4}
    ],

    pizzas: [
        new Pizza("margarita", [2]),
        new Pizza("napoli", [0,1,2,3])
    ]
};

function Pizza(name, ingredients, price){
    this.name = name;
    this.ingredients = ingredients;
    this.price = 5; // increase after time
    this.size = null;
    this.dough = null;
}

Pizza.prototype.copy = function(){
    return new Pizza(this.name, this.ingredients);
};

function App(){
    console.log("init pizzLand");
    this.myPizzas = [];
    this.activePizza = null;
    this.payment = []; // todo?
    this.notes = "";
    this.summary = {
        "key": "val"
    };
}

App.prototype.addPizza = function(id){
    this.myPizzas.push(CONST.pizzas[id].copy());
    this.activePizza = this.myPizzas[this.myPizzas.length - 1];
    $('.ui.modal').modal('hide');
    this.render();
};

App.prototype.showModal = function(){
    var self = this;

    var modal = $('.ui.modal');
    var html = "";
    var table = $('#modal-pizzas-table tbody');

    for(var i = 0; i < CONST.pizzas.length; i++){
        var pizza = CONST.pizzas[i];
        html += "<tr>" +
            "<td>"+ pizza.name +"</td>" +
            "<td><i>flags</i></td>" +
            "<td>"+ pizza.price +"</td>" +
            "<td>"+ pizza.price * 1.2 +"</td>" +
            "<td>"+ pizza.price * 1.5 +"</td>" +
            "</tr>"
        var tr = document.createElement('tr');
        tr = $(tr);
        tr.html("<td>"+ pizza.name +"</td>" +
            "<td><i>flags</i></td>" +
            "<td>"+ pizza.price +"</td>" +
            "<td>"+ pizza.price * 1.2 +"</td>" +
            "<td>"+ pizza.price * 1.5 +"</td>");

        tr.attr('data-pizza-id', i);

        tr.click( function(event){
            var id = $(this).attr('data-pizza-id');
            self.addPizza(id);
        });

        table.append(tr);

    }

    modal.modal('show');
};


App.prototype.renderMyPizzas = function(){
    var self = this;

    var myPizzasTable = $('#my-pizzas-table');
    for (var i =0; i < self.myPizzas.length; i++){
        var tr = document.createElement('tr');
        tr = $(tr);
        tr.html("<td class='active'>"+ self.myPizzas[i].name +"</td>");
        myPizzasTable.append(tr);
    }
};

App.prototype.changeImage = function(){
    var pizzaImg = $('#pizza-image');
    var images = ['assets/pizza1.jpg', 'assets/pizza2.jpg', 'assets/pizza3.jpg'];
    var randIdx = Math.floor((Math.random() * images.length));
    pizzaImg.attr('src', images[randIdx]);
};

App.prototype.render = function(){
   var self = this;

   self.renderMyPizzas();
   self.changeImage();
};


$(document).ready(function(){
    var app = new App();
    app.showModal();
});