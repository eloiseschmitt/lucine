/* Numer of item next icon in header */
let nbItemInCart = 0;
let $nbOfElements = $('.nbOfElements');

const $cartResume = $('#cart-resume');
let emptycart = 1; // 1 for yes, 0 for no

let $productImage = $('.product-image');
let $productName = $('.product-name');
let $productPrice = $('.product-price');

let tableRow = `
    <tr>
        <td class="product-image"></td>
        <td class="product-name"></td>
        <td class="product-price"></td>
        <td class="product-quantity">
            <select>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
            </select>
        </td>
        <td class="product-total-price">8,00 €</td>
        <td><i class="far fa-window-close"></i></td>
    </tr>
`;

$('.btn-add-cart').on('click', function() {
    // Increase number of items next icon in header
    nbItemInCart++;
    $nbOfElements.text(nbItemInCart);

    // if cart empty, create first row in modal
    if(emptycart === 1) {
        let productImage = $(this).parents('.product-wrapper').children('img').clone();
        //$productImage.html(productImage);

        let productName = $(this).parents('.product-wrapper').children('.details-wrapper').children('h3')[0].innerText;
        //$productName.text(productName);

        let productPrice = $(this).parents('.product-wrapper').children('.details-wrapper').children('p').data('price');
        //$productPrice.text(productPrice+',00 €');

        $cartResume.html(`
            <tr>
                <td class="product-image">${productImage}</td>
                <td class="product-name">${productName}</td>
                <td class="product-price">${productPrice},00 €</td>
                <td class="product-quantity">
                    <select>
                        <option selected>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </select>
                </td>
                <td class="product-total-price">8,00 €</td>
                <td><i class="far fa-window-close"></i></td>
            </tr>
        `);
        emptycart = 0;
    }
    // verify if product reference already in cart
    // if product not already in cart, create a row 
    // else increment quantity

    
    
});