// fetch API
const fetchData = async () => {
    const response = await fetch('https://fakestoreapi.com/products')
    const data = await response.json()
    console.log(data)

    const container = document.querySelector('.container')
    const cart = document.querySelector('.cart')
    const container2 = document.querySelector('.container2')
    const itemsCart = document.querySelector('#itemsCart')
    let count = 0
    let totalPrice = 0
    const cartItems = []

    // iterate through each product in the API and append it to UI
    data.forEach((product) => {
        const productCard = document.createElement('div')
        productCard.classList.add('product-card')
        productCard.innerHTML = `
            <div class="prod-image"><img class="image" src="${product.image}"/></div>
            <p>${product.title}</p>
            <p>${product.category}</p>
            <p>${product.price}</p>
            <button class="addbtn">Add to cart</button>`
        
        
        container.appendChild(productCard)
        productCard.querySelector('.addbtn').addEventListener('click', addToCart)
    })

    const searchInput = document.querySelector('#searchInput')

    searchInput.addEventListener('input', (e) => {
        const searchValue = e.target.value.toLowerCase()
        const filteredProducts = data.filter((product) => {
            return product.title.toLowerCase().includes(searchValue)
        })
        
        container.innerHTML = ''
        filteredProducts.forEach((product) => {
            const productCard = document.createElement('div')
            productCard.classList.add('product-card')
            productCard.innerHTML = `
            <div class="prod-image"><img class="image" src="${product.image}"/></div>
            <p>${product.title}</p>
            <p>${product.category}</p>
            <p>${product.price}</p>
            <button class="addbtn">Add to cart</button>`

            container.appendChild(productCard)
            productCard.querySelector('.addbtn').addEventListener('click', addToCart)
        })
    })
    const searchbtn = document.querySelector('#searchbtn')
    
    searchbtn.addEventListener('click', () => {
    const searchValue = searchInput.value.toLowerCase()
    const filteredProducts = data.filter((product) => {
        return product.title.toLowerCase().includes(searchValue)
    })
    
    // Get the selected product
    const selectedProduct = filteredProducts[0]
    
    // Add the selected product to the cartItems array
    let obj = {
        Name: selectedProduct.title,
        Price: selectedProduct.price,
        Image: selectedProduct.image,
    }
    cartItems.push(obj)
})
    

    // add eventlistener addToCart that adds products to cart on click
    const addbtn = document.getElementsByClassName('addbtn')
    for (let i = 0; i < addbtn.length; i++) {
        addbtn[i].addEventListener('click', addToCart)
    }
    
    

    function addToCart(e) {
        let btn = e.target
        let btnParent = btn.parentElement
        let btnParent2 = btn.parentElement
        let itemName = btnParent.children[1].innerText
        let itemPrice = parseFloat(btnParent.children[3].innerText)
        let itemImage = btnParent2.firstChild.nextSibling.children[0].src

        // store the required product fields in an object and push them to cart
        let obj = {
            Name: itemName,
            Price: itemPrice,
            Image: itemImage,
        }

        cartItems.push(obj)
        
        const itemsCart = document.querySelector('#itemsCart')
        itemsCart.innerHTML = ''
        // loop over array in cartItems and create div to display each item
        for (let item of cartItems) {
            const cartItem = document.createElement('div')
            cartItem.classList.add('cart-item')
            cartItem.innerHTML = `
        <div class="cart-image"><img class="image" src="${item.Image}"/></div>
        <p>${item.Name}</p>
        <p>${item.Price}</p>
        <i class="fa fa-trash removebtn"</i>`
        
            itemsCart.appendChild(cartItem)
        }

        // create event listener to remove individual products from cart
        const removebtn = document.getElementsByClassName('removebtn')
        for (let i = 0; i < removebtn.length; i++) {
            removebtn[i].addEventListener('click', removeFromCart)
        }
        
        // add the price and dispaly the output
        totalPrice += itemPrice
        document.querySelector('#total').textContent = `$${totalPrice.toFixed(2)}`

        // increment count
        count++
        document.querySelector('#count').textContent = `${count}`

    }
    
    // function to remove items from cart on click
    function removeFromCart(e) {
        let btn = e.target
        let btnParent = btn.parentElement
        let itemPrice = parseFloat(btnParent.children[2].innerText)
        let itemName = btnParent.children[1].innerText
        // finds indexes of elements with itemName and remove them from the cartItems array
        let itemIndex = cartItems.findIndex(item => item.Name === itemName)
        cartItems.splice(itemIndex, 1)

        itemsCart.removeChild(btnParent)
        // decrement price and count on removal of item from cart
        totalPrice -= itemPrice;
        document.querySelector('#total').textContent = `$${totalPrice.toFixed(2)}`;

        count--;
        document.querySelector('#count').textContent = `${count}`

    }
    // Event listener to clear cart
    const clearCartBtn = document.querySelector('.clearbtn')
    clearCartBtn.addEventListener('click', clearCart)

    // function that clears the cartItems array on click by looping and removing the first child
    function clearCart() {
        cartItems.length = 0
        const itemsCart = document.querySelector('#itemsCart')
        while (itemsCart.firstChild) {
            itemsCart.removeChild(itemsCart.firstChild)
        }
        totalPrice = 0
        count = 0

        document.querySelector('#total').textContent = `$${totalPrice.toFixed(2)}`
        document.querySelector('#count').textContent = `${count}`
    }
    
    
    const showOnPx = 100;
const backToTopButton = document.querySelector(".back-to-top");
const pageProgressBar = document.querySelector(".progress-bar");

    const scrollContainer = () => {
        return document.documentElement || document.body;
};

    const goToTop = () => {
        document.body.scrollIntoView({
            behavior: "smooth"
        });
};

    document.addEventListener("scroll", () => {
        // console.log("Scroll Height: ", scrollContainer().scrollHeight);
        // console.log("Client Height: ", scrollContainer().clientHeight);

        const scrolledPercentage =
            (scrollContainer().scrollTop /
                (scrollContainer().scrollHeight - scrollContainer().clientHeight)) *
    100;

    pageProgressBar.style.width = `${scrolledPercentage}%`;

        if (scrollContainer().scrollTop > showOnPx) {
            backToTopButton.classList.remove("hidden");
        } else {
            backToTopButton.classList.add("hidden");
        }
});

backToTopButton.addEventListener("click", goToTop);
    
    
}



fetchData()