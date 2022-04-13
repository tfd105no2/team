new Vue({
    el: '#root',
    data: {
        products: [],
        score: 100,
    },
    created: function () {
        let tasks = JSON.parse(localStorage.getItem("ticketsData"))
        this.products = tasks;
        console.log(this.products);
    },
    methods: {
        minus: function (product) {
            if (product.quantity > 1) {
                product.quantity--;
                // 存回localstorage
                localStorage.setItem("ticketsData", JSON.stringify(this.products));
            }
        },
        plus: function (product) {
            product.quantity++;
            // 存回localstorage
            localStorage.setItem("ticketsData", JSON.stringify(this.products));
        },
        remove: function (id) {
            let index = this.products.map(x => x.id).indexOf(id);
            this.products.splice(index, 1);
            console.log(this.products);
            // 存回localstorage
            localStorage.setItem("ticketsData", JSON.stringify(this.products));
        },
        totalPrice: function () {
            let sum = 0;
            this.products.forEach(function (product) {
                sum += product.price * product.quantity;
            });
            return sum;
        },
        payable: function () {
            let pay = 0;
            let sum = 0;
            this.products.forEach(function (product) {
                sum += product.price * product.quantity;
            });
            pay = sum - this.score;
            return pay;
        },

    },
}
);