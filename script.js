// Este es el punto de entrada del script. Se asegura de que el DOM (Document Object Model) esté completamente cargado antes de ejecutar cualquier código.
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOMContentLoaded: Ejecutando scripts principales.");

    // Llama a la función para renderizar la galería de productos, pero solo si el elemento existe en la página.
    renderGallery();
    // Llama a la función para renderizar el carrito de compras, pero solo si el elemento existe en la página.
    renderCart();

    // Adjunta los 'event listeners' (escuchadores de eventos) a los botones para añadir productos al carrito.
    attachAddToCartButtonsListeners();
    // Adjunta los listeners a los botones de control de cantidad (+/-) en el carrito.
    attachQuantityControlListeners();
    // Adjunta los listeners a los botones para eliminar productos del carrito.
    attachRemoveItemListeners();
    // Adjunta el listener al botón de 'Proceder al Pago'.

    // Adjunta los listeners para los botones de los modales (cerrar, aceptar, etc.).
    attachAllModalListeners();
});

//-----------------------------------------------------------------------------------------------------------------

// Función para renderizar la galería de productos.
function renderGallery() {
    // Busca el contenedor de la galería en el HTML por su ID.
    const galleryContainer = document.getElementById('gallery-container');
    // Si no encuentra el contenedor, significa que no estamos en la página de la galería, por lo que la función termina.
    if (!galleryContainer) {
        return;
    }

    console.log("Iniciando renderGallery()...");

    // Limpia cualquier contenido que pudiera haber en el contenedor para evitar duplicados.
    galleryContainer.innerHTML = '';
    // Itera sobre el array de productos importado de 'productos.js'.
    productos.forEach(product => {
        // Crea un nuevo elemento div para cada charm.
        const charmItemDiv = document.createElement('div');
        // Asigna una clase CSS al nuevo div.
        charmItemDiv.className = 'charm-item';
        // Inserta el HTML para cada charm, usando datos del objeto 'product' de forma dinámica.
        charmItemDiv.innerHTML = `
            <a href="${product.detailPage}" class="charm-link">
                <img src="${product.image}" alt="Charm ${product.name}">
                <h2>${product.name}</h2>
            </a>
            <span class="price">₡${product.price.toLocaleString('es-CR')}</span>
            <button class="add-to-cart-btn" data-product-id="${product.id}">Añadir al Carrito</button>
        `;
        // Agrega el nuevo div del charm al contenedor de la galería.
        galleryContainer.appendChild(charmItemDiv);
    });

    console.log("renderGallery() finalizado.");
}

//-----------------------------------------------------------------------------------------------------------------

// Función para renderizar los ítems en el carrito.
function renderCart() {
    // Busca el contenedor de los ítems del carrito.
    const cartItemsContainer = document.getElementById('cart-items-container');
    // Busca el mensaje de "carrito vacío".
    const emptyCartMessage = document.getElementById('empty-cart-message');
    // Busca el contenedor de resumen del carrito.
    const cartSummarySection = document.querySelector('.cart-summary-section');
    // Busca el botón de 'Proceder al Pago'.
    const checkoutButton = document.getElementById('checkout-button');

    // Si no encuentra los contenedores principales, la función termina.
    if (!cartItemsContainer || !emptyCartMessage) {
        return;
    }

    console.log("Iniciando renderCart()...");

    // Limpia el contenido del carrito.
    cartItemsContainer.innerHTML = '';
    // Obtiene el carrito del 'localStorage' o crea un array vacío si no existe.
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let subtotal = 0; // Inicializa el subtotal a cero.
    let itemCount = 0; // Inicializa el contador de ítems a cero.

    // Verifica si el carrito está vacío.
    if (cart.length === 0) {
        // Muestra el mensaje de carrito vacío.
        emptyCartMessage.style.display = 'block';
        console.log("Contenedor del carrito limpiado. Carrito vacío.");
        // Oculta el resumen y el botón de pago.
        if (cartSummarySection) cartSummarySection.style.display = 'none';
        if (checkoutButton) checkoutButton.style.display = 'none';

    } else {
        // Oculta el mensaje de carrito vacío si hay ítems.
        emptyCartMessage.style.display = 'none';
        // Muestra el resumen y el botón de pago.
        if (cartSummarySection) cartSummarySection.style.display = 'flex';
        if (checkoutButton) checkoutButton.style.display = 'block';
        // Itera sobre cada ítem en el carrito.
        cart.forEach(cartItem => {
            // Busca la información completa del producto en el array 'productos' usando el ID.
            const product = productos.find(p => p.id === cartItem.id);
            if (product) {
                // Calcula el total de un ítem y lo suma al subtotal general.
                const itemTotal = product.price * cartItem.quantity;
                subtotal += itemTotal;
                itemCount += cartItem.quantity;

                // Crea un nuevo div para el ítem del carrito.
                const cartItemDiv = document.createElement('div');
                cartItemDiv.className = 'cart-item';
                // Almacena el ID del producto en el div para poder referenciarlo.
                cartItemDiv.dataset.productId = product.id;
                // Inserta el HTML para el ítem del carrito.
                cartItemDiv.innerHTML = `
                    <img src="${product.image}" alt="${product.name}" class="cart-item-image">
                    <div class="cart-item-details">
                        <h3>${product.name}</h3>
                        <p>Precio: ₡${product.price.toLocaleString('es-CR')}</p>
                    </div>
                    <div class="cart-item-quantity-controls">
                        <button class="quantity-btn minus-btn" data-id="${product.id}">-</button>
                        <input type="number" class="item-quantity-input" value="${cartItem.quantity}" min="1" data-id="${product.id}">
                        <button class="quantity-btn plus-btn" data-id="${product.id}">+</button>
                    </div>
                    <span class="cart-item-price">₡${itemTotal.toLocaleString('es-CR')}</span>
                    <button class="remove-item-btn" data-id="${product.id}">×</button>
                `;
                // Agrega el nuevo div al contenedor del carrito.
                cartItemsContainer.appendChild(cartItemDiv);
            }
        });
    }

    // Actualiza el texto del subtotal, el contador de ítems y el total en el HTML.
    document.getElementById('cart-subtotal').textContent = `₡${subtotal.toLocaleString('es-CR')}`;
    document.getElementById('cart-item-count').textContent = itemCount;
    document.getElementById('cart-total').textContent = `₡${subtotal.toLocaleString('es-CR')}`;
    console.log(`Subtotal actualizado: ${subtotal}`);

    // Vuelve a adjuntar los listeners de cantidad y eliminar, ya que los elementos del carrito se han vuelto a crear.
    attachQuantityControlListeners();
    attachRemoveItemListeners();
    console.log("renderCart() finalizado. Event listeners adjuntados.");
}

//-----------------------------------------------------------------------------------------------------------------

// Función para adjuntar los listeners a los botones 'Añadir al Carrito'.
function attachAddToCartButtonsListeners() {
    console.log("Iniciando attachAddToCartButtonsListeners()...");
    // Primero, remueve los listeners existentes para evitar que se ejecuten varias veces.
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.removeEventListener('click', handleAddToCartClick);
    });
    // Luego, añade el listener 'click' a todos los botones que tengan la clase.
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', handleAddToCartClick);
    });
    console.log("attachAddToCartButtonsListeners() finalizado.");
}

//-----------------------------------------------------------------------------------------------------------------

// Función que se ejecuta cuando se hace clic en un botón de 'Añadir al Carrito'.
function handleAddToCartClick(e) {
    // Obtiene el ID del producto desde el atributo 'data-product-id' del botón.
    const productId = e.target.dataset.productId;
    console.log(`handleAddToCartClick: ID del producto: ${productId}`);
    // Llama a la función 'addToCart' para agregar el producto.
    addToCart(productId);
}

//-----------------------------------------------------------------------------------------------------------------

// Función para añadir un producto al carrito.
function addToCart(productId) {
    // Obtiene el carrito del 'localStorage'.
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    // Busca si el producto ya existe en el carrito.
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        // Si el producto ya está, solo aumenta la cantidad en uno.
        existingItem.quantity++;
    } else {
        // Si no está, lo agrega al carrito con una cantidad inicial de uno.
        cart.push({ id: productId, quantity: 1 });
    }

    // Guarda el carrito actualizado en 'localStorage'.
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log(`Carrito guardado en localStorage: ${JSON.stringify(cart)}`);
    // Muestra una alerta simple de confirmación.
    alert('¡Producto añadido al carrito!');
    // Llama a 'renderCart' para actualizar la interfaz del carrito.
    renderCart();
}

//-----------------------------------------------------------------------------------------------------------------

// Función para adjuntar los listeners a los botones de control de cantidad (+/-) y al input.
function attachQuantityControlListeners() {
    console.log("Iniciando attachQuantityControlListeners()...");
    // Limpia los listeners existentes para evitar duplicados.
    document.querySelectorAll('.quantity-btn').forEach(button => {
        button.removeEventListener('click', handleQuantityChange);
    });
    document.querySelectorAll('.item-quantity-input').forEach(input => {
        input.removeEventListener('change', handleQuantityInputChange);
    });

    // Adjunta los listeners para los botones de cantidad (+/-).
    document.querySelectorAll('.quantity-btn').forEach(button => {
        button.addEventListener('click', handleQuantityChange);
    });
    // Adjunta los listeners para el input de cantidad.
    document.querySelectorAll('.item-quantity-input').forEach(input => {
        input.addEventListener('change', handleQuantityInputChange);
    });
    console.log("attachQuantityControlListeners() finalizado.");
}

//-----------------------------------------------------------------------------------------------------------------

// Función que se ejecuta cuando se hace clic en un botón de cantidad (+/-).
function handleQuantityChange(e) {
    // Obtiene el ID del producto y la acción (+ o -) desde el botón.
    const productId = e.target.dataset.id;
    const action = e.target.textContent;
    // Llama a la función 'updateQuantity' para modificar la cantidad.
    updateQuantity(productId, action);
}

//-----------------------------------------------------------------------------------------------------------------

// Función que se ejecuta cuando cambia el valor del input de cantidad.
function handleQuantityInputChange(e) {
    // Obtiene el ID del producto y la nueva cantidad del input.
    const productId = e.target.dataset.id;
    const newQuantity = parseInt(e.target.value);
    // Valida que la nueva cantidad sea un número válido y mayor o igual a 1.
    if (!isNaN(newQuantity) && newQuantity >= 1) {
        updateQuantity(productId, null, newQuantity);
    } else {
        // Si el valor no es válido, restaura el valor a la cantidad actual o a 1.
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingItem = cart.find(item => item.id === productId);
        e.target.value = existingItem ? existingItem.quantity : 1;
    }
}

//-----------------------------------------------------------------------------------------------------------------

// Función para actualizar la cantidad de un producto.
function updateQuantity(productId, action, newQuantity = null) {
    // Obtiene el carrito de 'localStorage'.
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        console.log(`Llamada a updateQuantity para ID: ${productId}, Cantidad actual: ${existingItem.quantity}, Acción: ${action || 'direct input'}`);
        if (action === '+') {
            // Si la acción es '+', aumenta la cantidad.
            existingItem.quantity++;
        } else if (action === '-') {
            // Si la acción es '-', disminuye la cantidad.
            existingItem.quantity--;
            if (existingItem.quantity <= 0) {
                // Si la cantidad llega a 0, filtra el array para eliminar el ítem.
                cart = cart.filter(item => item.id !== productId);
            }
        } else if (newQuantity !== null) {
            // Si se proporciona un nuevo valor, actualiza la cantidad directamente.
            if (newQuantity >= 1) {
                existingItem.quantity = newQuantity;
            } else {
                // Si el valor es menor que 1, elimina el ítem.
                cart = cart.filter(item => item.id !== productId);
            }
        }
        console.log(`Cantidad de ${productId} actualizada a: ${existingItem ? existingItem.quantity : 'eliminado'}`);
    }

    // Guarda el carrito actualizado en 'localStorage'.
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log("Carrito guardado en localStorage");
    // Llama a 'renderCart' para actualizar la interfaz.
    renderCart();
}

//-----------------------------------------------------------------------------------------------------------------

// Función para adjuntar los listeners a los botones de eliminar ítems.
function attachRemoveItemListeners() {
    console.log("Iniciando attachRemoveItemListeners()...");
    // Remueve los listeners existentes para evitar duplicados.
    document.querySelectorAll('.remove-item-btn').forEach(button => {
        button.removeEventListener('click', handleRemoveItem);
    });

    // Adjunta los listeners a los botones de eliminar.
    document.querySelectorAll('.remove-item-btn').forEach(button => {
        button.addEventListener('click', handleRemoveItem);
    });
    console.log("attachRemoveItemListeners() finalizado.");
}

//-----------------------------------------------------------------------------------------------------------------

// Función que se ejecuta cuando se hace clic en un botón de eliminar.
function handleRemoveItem(e) {
    // Obtiene el ID del producto a eliminar.
    const productId = e.target.dataset.id;
    // Llama a la función 'removeFromCart'.
    removeFromCart(productId);
}

//-----------------------------------------------------------------------------------------------------------------

// Función para eliminar un producto del carrito.
function removeFromCart(productId) {
    // Obtiene el carrito de 'localStorage'.
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    // Filtra el carrito para crear uno nuevo sin el ítem a eliminar.
    cart = cart.filter(item => item.id !== productId);
    // Guarda el nuevo carrito en 'localStorage'.
    localStorage.setItem('cart', JSON.stringify(cart));
    // Llama a 'renderCart' para actualizar la interfaz.
    renderCart();
}

//-----------------------------------------------------------------------------------------------------------------

// La función para adjuntar el listener al botón de 'Proceder al Pago'.
function attachCheckoutButtonListener() {
    const checkoutButton = document.getElementById('checkout-button');
    if (checkoutButton) {
        // Agrega el listener para la función 'handleCheckout'.
        // Nota: Asegúrate de que la función 'handleCheckout' esté definida en algún lugar de tu código.
        checkoutButton.addEventListener('click', handleCheckout);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Llama a la función para adjuntar el listener.
    // Esto asegura que el botón 'checkout-button' ya exista en la página cuando el código se ejecute.
    attachCheckoutButtonListener();
});

//-----------------------------------------------------------------------------------------------------------------

// Función para manejar los modales de la página.
function attachAllModalListeners() {
    const sinpeModal = document.getElementById('sinpeConfirmModal'); // Obtiene el modal de SINPE.
    const orderReceivedModal = document.getElementById('orderReceivedModal'); // Obtiene el modal de pedido recibido.

    // Itera sobre todos los botones de cerrar ('x') y les añade un listener.
    document.querySelectorAll('.close-button').forEach(button => {
        button.addEventListener('click', (e) => {
            const modalId = e.target.dataset.modal;
            // Oculta el modal correspondiente.
            document.getElementById(modalId).style.display = 'none';
        });
    });

    // Añade un listener a la ventana para cerrar el modal si se hace clic fuera de su contenido.
    window.addEventListener('click', (event) => {
        if (event.target === sinpeModal) {
            sinpeModal.style.display = 'none';
        }
        if (event.target === orderReceivedModal) {
            orderReceivedModal.style.display = 'none';
        }
    });

    // Maneja el clic en el botón 'Aceptar' del modal de SINPE.
    const sinpeAcceptButton = document.getElementById('modal-sinpe-accept-button');
    if (sinpeAcceptButton) {
        sinpeAcceptButton.addEventListener('click', () => {
            console.log("Botón 'Aceptar' del modal SINPE clicado.");
            // 1. Vacía el carrito en 'localStorage'.
            localStorage.removeItem('cart');
            console.log("Carrito vaciado en localStorage.");

            // 2. Oculta el modal de SINPE.
            sinpeModal.style.display = 'none';

            // 3. Vuelve a renderizar el carrito para que se muestre vacío en la página.
            renderCart();

            // 4. Muestra el modal de "¡Pedido Recibido!".
            orderReceivedModal.style.display = 'flex';
        });
    }

    // Maneja el clic en el botón 'OK' del modal de "¡Pedido Recibido!".
    const orderReceivedOkButton = document.getElementById('modal-order-received-ok-button');
    if (orderReceivedOkButton) {
        orderReceivedOkButton.addEventListener('click', () => {
            console.log("Botón 'OK' del modal 'Pedido Recibido' clicado.");
            // Oculta el modal.
            orderReceivedModal.style.display = 'none';
        });
    }
}

//-----------------------------------------------------------------------------------------------------------------

// Función que se ejecuta cuando se hace clic en el botón 'Proceder al Pago'.
function handleCheckout() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        // Muestra una alerta si el carrito está vacío.
        alert("Tu carrito está vacío. ¡No hay nada que pagar!");
        return;
    }

    const totalElement = document.getElementById('cart-total');
    // Obtiene el texto del total y lo limpia para obtener el número.
    const totalAmountText = totalElement ? totalElement.textContent : '₡0';
    const totalAmount = parseFloat(totalAmountText.replace('₡', '').replace(/\./g, '').replace(/,/g, ''));

    // Crea el mensaje para el pago con SINPE.
    const sinpeInfo = `
        ¡Gracias por tu compra!
        Para completar tu pedido, por favor realiza un SINPE Móvil al siguiente número:
        
        Número de SINPE Móvil: 8593 8499
        Nombre del número de SINPE Móvil: Camila Sanchez
        Monto Total: ${totalAmountText}
        
        Una vez realizado el pago, por favor envía el comprobante a nuestro WhatsApp para coordinar la entrega.
        ¡Esperamos verte pronto!
    `;

    const sinpeModal = document.getElementById('sinpeConfirmModal'); // Obtiene el modal.
    const sinpeModalMessageContent = document.getElementById('sinpe-modal-message-content'); // Obtiene el contenido del modal.

    if (sinpeModalMessageContent) {
        // Inserta el mensaje de SINPE en el modal, reemplazando los saltos de línea con <br>.
        sinpeModalMessageContent.innerHTML = `<p>${sinpeInfo.replace(/\n/g, '<br>')}</p>`;
    }
    
    if (sinpeModal) {
        // Muestra el modal de SINPE.
        sinpeModal.style.display = 'flex';
    }
}