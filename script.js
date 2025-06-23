document.addEventListener('DOMContentLoaded', () => {
    const products = [
        // --- Nhóm Bánh Mì Bơ (Món ăn nhẹ) ---
        {
            id: 1,
            name: "Bánh mì bơ tỏi",
            price: 25000,
            img: "https://daylambanh.edu.vn/wp-content/uploads/2017/03/banh-mi-bo-toi.jpg" // Placeholder
        },
        {
            id: 2,
            name: "Bánh Macaroon",
            price: 25000,
            img: "https://static.hawonkoo.vn/hwks1/images/2023/09/cach-lam-banh-macaron-bang-noi-chien-khong-dau.jpg" // Placeholder
        },
        {
            id: 3,
            name: "Bánh Croissant",
            price: 30000,
            img: "https://static.hawonkoo.vn/hwks1/images/2023/08/cach-lam-banh-croissant-bang-noi-chien-khong-dau-3.jpg" // Placeholder
        },
        // --- Nhóm Café ---
        {
            id: 4,
            name: "Espresso",
            price: 40000,
            img: "https://nhanvipcoffee.com.vn/wp-content/uploads/2024/06/espresso-la-gi-nguyen-tac-pha-espresso-dung-chuan-202307120718497350.jpeg" // Placeholder
        },
        {
            id: 5,
            name: "Cappuccino",
            price: 45000,
            img: "https://www.cuisinart.com/dw/image/v2/ABAF_PRD/on/demandware.static/-/Sites-us-cuisinart-sfra-Library/default/dw30047d66/images/recipe-Images/cappuccino1-recipe.jpg?sw=1200&sh=630" // Placeholder
        },
        {
            id: 6,
            name: "Americano",
            price: 45000,
            img: "https://thecoffeeholic.vn/storage/photos/2/Phinholic/esp/ca-phe-Americano-1.jpg" // Placeholder
        },
        {
            id: 7,
            name: "Macchiato",
            price: 45000,
            img: "https://roastercoffees.com/wp-content/uploads/2021/05/Espresso-Macchiato-Recipe.webp" // Placeholder
        },
        {
            id: 8,
            name: "Mocha",
            price: 45000,
            img: "https://ichef.bbc.co.uk/ace/standard/1600/food/recipes/the_perfect_mocha_coffee_29100_16x9.jpg.webp" // Placeholder
        },
        {
            id: 9,
            name: "Lục trà xoài",
            price: 45000,
            img: "https://nguyenlieuantoan.com/assets/ckfinder/uploads/images/C%C3%94NG%20TH%E1%BB%A8C%20PHA%20CH%E1%BA%BE/TR%C3%80%20CHANH/photo1626165579849-16261655800351352263022.jpeg" // Placeholder
        },
        {
            id: 10,
            name: "Cà phê trứng",
            price:40000,
            img: "https://rapido.vn/wp-content/uploads/2024/02/Quan_cafe_cacao_trung_Vung_Tau_Palma_9.jpeg" // Placeholder
        },
        // --- Nhóm Trà ---
        {
            id: 11,
            name: "Trà đào cam sả",
            price: 40000,
            img: "https://product.hstatic.net/200000791069/product/lord-50_5221e714bef5444aaab6759e2a219146_master.jpg" // Placeholder
        },
        {
            id: 12,
            name: "Trà dưa lưới",
            price: 45000,
            img: "https://tea-pop.com.vn/watermark/product/540x540x1/upload/product/tra-dua-luoi-hoang-kim-2789.jpg" // Placeholder
        },
        {
            id: 13,
            name: "Matcha Latte",
            price: 45000,
            img: "https://ucarecdn.com/6aaa3bb8-8a69-41a1-9f8a-7c9a7380c4d6/-/crop/4016x5425/0,296/-/preview/" // Placeholder
        },
        {
        id: 14,
            name: "Cokie Latte",
            price: 45000,
            img: "https://www.orchidsandsweettea.com/wp-content/uploads/2022/06/Cookie-Caramel-Latte-4-of-5.jpg" // Placeholder
        }
    ];

    let cart = JSON.parse(localStorage.getItem('cart')) || []; // Load cart from localStorage

    const productList = document.getElementById('product-list');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const cartCountElement = document.getElementById('cart-count');
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartToggle = document.getElementById('cart-toggle');
    const closeCartBtn = document.getElementById('close-cart');
    const scrollToMenuBtn = document.querySelector('.scroll-to-menu');

    // Checkout Modal elements
    const checkoutModal = document.getElementById('checkout-modal');
    const openCheckoutModalBtn = document.getElementById('open-checkout-modal');
    const closeCheckoutModalBtn = document.getElementById('close-checkout-modal');
    const checkoutForm = document.getElementById('checkout-form');
    const modalTotalElement = document.getElementById('modal-total');

    // Contact Form element
    const contactForm = document.getElementById('contact-form');

    // Function to render products on the page
    function renderProducts() {
        productList.innerHTML = '';
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <img src="${product.img}" alt="${product.name}">
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p class="price">${product.price.toLocaleString('vi-VN')}₫</p>
                    <button class="btn btn-add-to-cart" onclick="addToCart(${product.id})">
                        <i class="fas fa-cart-plus"></i> Thêm vào giỏ
                    </button>
                </div>
            `;
            productList.appendChild(productCard);
        });
    }

    // Function to render items in the cart
    function renderCart() {
        cartItemsContainer.innerHTML = '';
        let total = 0;
        let itemCount = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p style="text-align: center; color: #777;">Giỏ hàng của bạn đang trống.</p>';
        }

        cart.forEach(item => {
            total += item.price * item.qty;
            itemCount += item.qty;
            const cartItemDiv = document.createElement('div');
            cartItemDiv.className = 'cart-item';
            cartItemDiv.innerHTML = `
                <img src="${item.img}" alt="${item.name}">
                <div class="cart-item-info">
                    <strong>${item.name}</strong><br>
                    <span>${item.price.toLocaleString('vi-VN')}₫ x ${item.qty}</span>
                </div>
                <button class="cart-item-remove" onclick="removeFromCart(${item.id})">
                    <i class="fas fa-trash-alt"></i>
                </button>
            `;
            cartItemsContainer.appendChild(cartItemDiv);
        });

        cartTotalElement.innerText = `Tổng cộng: ${total.toLocaleString('vi-VN')}₫`;
        cartCountElement.innerText = itemCount;
        localStorage.setItem('cart', JSON.stringify(cart)); // Save cart to localStorage
    }

    // Function to add a product to the cart
    window.addToCart = (id) => {
        const product = products.find(p => p.id === id);
        const itemInCart = cart.find(i => i.id === id);

        if (itemInCart) {
            itemInCart.qty += 1;
        } else {
            cart.push({...product, qty: 1 });
        }
        renderCart();
        showCart(); // Show cart when an item is added
    };

    // Function to remove a product from the cart
    window.removeFromCart = (id) => {
        cart = cart.filter(item => item.id !== id);
        renderCart();
    };

    // --- New Feature: Checkout Modal ---
    openCheckoutModalBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Giỏ hàng của bạn đang trống. Vui lòng thêm sản phẩm để thanh toán!');
            return;
        }
        checkoutModal.classList.add('show');
        modalTotalElement.innerText = cartTotalElement.innerText.replace('Tổng cộng: ', ''); // Update total in modal
        hideCart(); // Hide sidebar when modal opens
    });

    closeCheckoutModalBtn.addEventListener('click', () => {
        checkoutModal.classList.remove('show');
        checkoutForm.reset(); // Clear form on close
    });

    // Close modal if clicking outside
    window.addEventListener('click', (event) => {
        if (event.target === checkoutModal) {
            checkoutModal.classList.remove('show');
            checkoutForm.reset();
        }
    });

    // Handle checkout form submission
    checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const customerName = document.getElementById('customer-name').value;
        const customerPhone = document.getElementById('customer-phone').value;
        const customerAddress = document.getElementById('customer-address').value;
        const paymentMethod = document.getElementById('payment-method').value;

        // Basic validation
        if (!customerName || !customerPhone || !customerAddress || !paymentMethod) {
            alert('Vui lòng điền đầy đủ thông tin thanh toán.');
            return;
        }

        let orderSummary = `Cảm ơn bạn, ${customerName}!\nĐơn hàng của bạn đã được tiếp nhận và đang được xử lý.\n\nChi tiết đơn hàng:\n`;
        cart.forEach(item => {
            orderSummary += `- ${item.name} x ${item.qty} (${item.price.toLocaleString('vi-VN')}₫)\n`;
        });
        orderSummary += `\nTổng cộng: ${modalTotalElement.innerText}\n`;
        orderSummary += `Địa chỉ giao hàng: ${customerAddress}\n`;
        orderSummary += `Số điện thoại: ${customerPhone}\n`;
        orderSummary += `Phương thức thanh toán: ${paymentMethod === 'cod' ? 'Thanh toán khi nhận hàng (COD)' : paymentMethod === 'bank-transfer' ? 'Chuyển khoản ngân hàng' : 'Momo'}\n`;
        orderSummary += `\nChúng tôi sẽ liên hệ lại sớm nhất để xác nhận.`;

        alert(orderSummary);

        cart = []; // Clear the cart after successful checkout
        renderCart();
        checkoutModal.classList.remove('show'); // Close modal
        checkoutForm.reset(); // Reset form
    });

    // Toggle cart sidebar visibility
    cartToggle.addEventListener('click', () => {
        cartSidebar.classList.toggle('open');
    });

    closeCartBtn.addEventListener('click', () => {
        cartSidebar.classList.remove('open');
    });

    function showCart() {
        cartSidebar.classList.add('open');
    }

    function hideCart() {
        cartSidebar.classList.remove('open');
    }

    // --- New Feature: Smooth Scrolling for Navigation ---
    document.querySelectorAll('.main-nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Scroll to menu section button
    if (scrollToMenuBtn) {
        scrollToMenuBtn.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('menu').scrollIntoView({ behavior: 'smooth' });
        });
    }

    // --- New Feature: Simple Contact Form Submission (Alert) ---
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Cảm ơn bạn đã gửi tin nhắn! Chúng tôi sẽ phản hồi sớm nhất có thể.');
        contactForm.reset();
    });

    // Initial render
    renderProducts();
    renderCart();
});