

const Productos = [
    {
        id: 1,
        title: "Taco",
        cost: 12.39,
        image: "https://source.unsplash.com/random?Taco", 
        descripcion: "test",
        categoria: "PlatosFuertes",
        disponible: false
    }, {
        id: 2,
        title: "Steak",
        cost: 18.07,
        image: "https://source.unsplash.com/random?Steak", 
        descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et ex mattis, volutpat velit quis, porta mi. ",
        categoria: "PlatosFuertes",
        disponible: true
    }, {
        id: 3,
        title: "Bread",
        cost: 4.07,
        image: "https://source.unsplash.com/random?Bread", 
        descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et ex mattis, volutpat velit quis, porta mi. ",
        categoria: "Entradas",
        disponible: false
    }, {
        id: 4,
        title: "Wine",
        cost: 4.76,
        image: "https://source.unsplash.com/random?Wine", 
        descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et ex mattis, volutpat velit quis, porta mi. ",
        categoria: "Bebidas",
        disponible: true
    }, {
        id: 5,
        title: "Spaghetti",
        cost: 14.47,
        image: "https://source.unsplash.com/random?Spaghetti", 
        descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et ex mattis, volutpat velit quis, porta mi. ",
        categoria: "PlatosFuertes",
        disponible: true
    }, {
        id: 6,
        title: "Fries",
        cost: 14.16,
        image: "https://source.unsplash.com/random?Fries", 
        descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et ex mattis, volutpat velit quis, porta mi. ",
        categoria: "Entradas",
        disponible: false
    }, {
        id: 7,
        title: "Burger",
        cost: 19.10,
        image: "https://source.unsplash.com/random?Burger", 
        descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et ex mattis, volutpat velit quis, porta mi. ",
        categoria: "PlatosFuertes",
        disponible: true
    }, {
        id: 8,
        title: "Lasagna",
        cost: 16.54,
        image: "https://source.unsplash.com/random?Lasagna", 
        descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et ex mattis, volutpat velit quis, porta mi. ",
        categoria: "PlatosFuertes",
        disponible: true
    }, {
        id: 9,
        title: "Pasta",
        cost: 1.47,
        image: "https://source.unsplash.com/random?Pasta", 
        descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et ex mattis, volutpat velit quis, porta mi. ",
        categoria: "PlatosFuertes",
        disponible: true
    }, {
        id: 10,
        title: "Nuggets",
        cost: 18.83,
        image: "https://source.unsplash.com/random?Nuggets", 
        descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et ex mattis, volutpat velit quis, porta mi. ",
        categoria: "Entradas",
        disponible: true
    }, {
        id: 11,
        title: "Beer",
        cost: 3.00,
        image: "https://source.unsplash.com/random?Beer", 
        descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et ex mattis, volutpat velit quis, porta mi. ",
        categoria: "Bebidas",
        disponible: false
    }, {
        id: 12,
        title: "Sandwich",
        cost: 0.71,
        image: "https://source.unsplash.com/random?Sandwich", 
        descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et ex mattis, volutpat velit quis, porta mi. ",
        categoria: "PlatosFuertes",
        disponible: false
    }, {
        id: 13,
        title: "Pizza",
        cost: 0.24,
        image: "https://source.unsplash.com/random?Pizza", 
        descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et ex mattis, volutpat velit quis, porta mi. ",
        categoria: "PlatosFuertes",
        disponible: true
    }, {
        id: 14,
        title: "Ramen",
        cost: 12.06,
        image: "https://source.unsplash.com/random?Ramen", 
        descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et ex mattis, volutpat velit quis, porta mi. ",
        categoria: "PlatosFuertes",
        disponible: false
    }, {
        id: 15,
        title: "Curry",
        cost: 16.11,
        image: "https://source.unsplash.com/random?Curry", 
        descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et ex mattis, volutpat velit quis, porta mi. ",
        categoria: "PlatosFuertes",
        disponible: false
    }, {
        id: 16,
        title: "Lemonade",
        cost: 1.72,
        image: "https://source.unsplash.com/random?Lemonade",
        descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et ex mattis, volutpat velit quis, porta mi. ",
        categoria: "Bebidas",
        disponible: true
    }, {
        id: 17,
        title: "Nachos",
        cost: 9.78,
        image: "https://source.unsplash.com/random?Nachos", 
        descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et ex mattis, volutpat velit quis, porta mi. ",
        categoria: "Entradas",
        disponible: true
    }, {
        id: 18,
        title: "Ribs",
        cost: 11.25,
        image: "https://source.unsplash.com/random?Ribs",
        descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et ex mattis, volutpat velit quis, porta mi. ",
        categoria: "PlatosFuertes",
        disponible: false
    }, {
        id: 19,
        title: "Soup",
        cost: 15.70,
        image: "https://source.unsplash.com/random?Soup",
        descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et ex mattis, volutpat velit quis, porta mi. ",
        categoria: "PlatosFuertes",
        disponible: true
    }, {
        id: 20,
        title: "Ice Cream",
        cost: 5.20,
        image: "https://source.unsplash.com/random?IceCream",
        descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et ex mattis, volutpat velit quis, porta mi. ",
        categoria: "Postres",
        disponible: false
    }]

export default Productos