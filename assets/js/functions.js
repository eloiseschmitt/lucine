/* Numer of item next icon in header */
let nbItemInCart = 0;
let $nbOfElements = $('.nbOfElements');

const $cartResume = $('#cart-resume');
let idsInCart = [];
let idProductClicked = '';

/* Add a product in cart or increment quantity */
$('.btn-add-cart').on('click', function() {
    nbItemInCart++; // Increase number of items next icon in header
    $nbOfElements.text(nbItemInCart);

    idProductClicked = $(this).parents('.product-wrapper').children('.details-wrapper').children('h3').data('id'); // id product clicked
    let productPrice = $(this).parents('.product-wrapper').children('.details-wrapper').children('p').data('price');
    let optionSelected = ""; 

    let idAndQuantity = {
        id: idProductClicked,
        quantity: 1,
        price: +productPrice
    }
    let find = idsInCart.find(product => product.id == idAndQuantity.id); 
    if(find == undefined) { // product id not already in cart, add it
        idsInCart.push(idAndQuantity);
        let productName = $(this).parents('.product-wrapper').children('.details-wrapper').children('h3')[0].innerText;

        $cartResume.append(`
            <tr data-id="${idProductClicked}">
                <td class="product-image">${$(this).parents('.product-wrapper').children('img')[0].outerHTML}</td>
                <td class="product-name">${productName}</td>
                <td class="product-price">${productPrice},00 €</td>
                <td class="product-quantity">
                    <select onchange="modifyQuantity(this, ${idProductClicked});">
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
    }
    else {
        find.quantity++; // else increment quantity
        switch(find.quantity) {
            case 1: 
                optionSelected = `<option selected>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>`;
            break;
            case 2:
                optionSelected = `<option>1</option>
                <option selected>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>`;
            break;
            case 3:
                optionSelected = `<option>1</option>
                <option>2</option>
                <option selected>3</option>
                <option>4</option>
                <option>5</option>`;
            break;
            case 4:
                optionSelected = `<option>1</option>
                <option>2</option>
                <option>3</option>
                <option selected>4</option>
                <option>5</option>`;
            break;
            case 5:
                optionSelected = `<option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option selected>5</option>`;
        }
        $('tbody').find(`tr[data-id=${idProductClicked}]`).children('td.product-quantity').children().html(optionSelected); // Modify option selected
        $('tbody').find(`tr[data-id=${idProductClicked}]`).children('td.product-total-price').text(find.quantity*find.price+',00 €'); // Modify total price
    }
       
});

/* Modify quantity in cart by row */
function modifyQuantity(val, idProductClicked) {
    idProductClicked = idProductClicked;
    let find = idsInCart.find(product => product.id == idProductClicked); 
    find.quantity = parseInt(val.value);
    $('tbody').find(`tr[data-id=${idProductClicked}]`).children('td.product-total-price').text(find.quantity*find.price+',00 €'); // Modify total price
}
