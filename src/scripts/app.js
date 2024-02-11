const cartPreviewButton = document.querySelector('.fa-shopping-cart');
const cartViewItems = document.querySelector('.cart-items-container');
const cartItemCount = document.querySelector('.quantity-cart');
const cartItemsContainer = document.querySelector('.cart-items');
const cartTotalElement = document.querySelector('.cart-total');
const cartButtons = document.querySelectorAll('.cart-btn');
const cartItems = [];


cartPreviewButton.addEventListener('click', function() {
    cartViewItems.style.display = cartViewItems.style.display === 'block' ? 'none' : 'block';
});

document.querySelectorAll('.cart-btn').forEach(button => {
    button.addEventListener('click', () => {
        cartItemCount.textContent = parseInt(cartItemCount.textContent || 0) + 1;
    });
});

document.addEventListener('DOMContentLoaded', function () {
    cartButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            const box = this.closest('.box');
            const itemName = box.querySelector('.content h3').textContent;
            const itemPrice = parseFloat(box.querySelector('.price').textContent.replace('R$', '').trim());
            const itemImageSrc = box.querySelector('.image img').src;

            addItemToCart(itemName, itemPrice, itemImageSrc);
        });
    });

    function addItemToCart(name, price, imageSrc) {
        const existingItem = cartItems.find(item => item.name === name);
        
        if (existingItem) {
            existingItem.quantity++;
            existingItem.total += price;
        } else {
            const newItem = {
                name: name,
                price: price,
                imageSrc: imageSrc,
                quantity: 1,
                total: price
            };
            cartItems.push(newItem);
        }

        renderCartItems();
    }

    function renderCartItems() {
        cartItemsContainer.innerHTML = '';

        cartItems.forEach(function (item, index) {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');

            cartItem.innerHTML = `
                <span class="fas fa-times" data-index="${index}"></span>
                <img src="${item.imageSrc}" alt="">
                <div class="content">
                    <h3>${item.name}</h3>
                    <div class="price">R$${item.price.toFixed(2)}</div>
                    <div class="quantity">
                        <button class="quantity-btn decrease-btn" data-index="${index}">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn increase-btn" data-index="${index}">+</button>
                    </div>
                </div>
            `;

            cartItemsContainer.appendChild(cartItem);
        });

        updateCartTotal();
        
        const removeItemCart = document.querySelectorAll('.fa-times');
        removeItemCart.forEach(function (icon) {
            icon.addEventListener('click', function () {
                const index = parseInt(icon.getAttribute('data-index'));
                removeItem(index);
            });
        });

        const decreaseButtons = document.querySelectorAll('.decrease-btn');
        decreaseButtons.forEach(function (button) {
            button.addEventListener('click', function () {
                const index = parseInt(button.getAttribute('data-index'));
                decreaseQuantity(index);
            });
        });

        const increaseButtons = document.querySelectorAll('.increase-btn');
        increaseButtons.forEach(function (button) {
            button.addEventListener('click', function () {
                const index = parseInt(button.getAttribute('data-index'));
                increaseQuantity(index);
            });
        });
    }

    function removeItem(index) {
        const removedItem = cartItems.splice(index, 1)[0];

        renderCartItems();
    }

    function decreaseQuantity(index) {
        if (cartItems[index].quantity > 1) {
            cartItems[index].quantity--;

            renderCartItems();
        }
    }

    function increaseQuantity(index) {
        cartItems[index].quantity++;

        renderCartItems();
    }

    function updateCartTotal() {
        let total = 0;
        cartItems.forEach(function (item) {
            total += item.price * item.quantity;
        });

        cartTotalElement.textContent = `Total: R$${total.toFixed(2)}`;
    }
});