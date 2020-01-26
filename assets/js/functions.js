const $cartResume = $('#cart-resume');
let idsInCart = [];
let idProductClicked = '';

/* Numer of item next icon in header */
let nbItemInCart = 0;
let $nbOfElements = $('.nbOfElements');

let $totalPriceInCart = $('.total-cart');

/* Function to calculate the total amount of the cart + the number of items */
function totalAmount() {
    let total = 0;
    nbItemInCart = 0;
    if(idsInCart.length !== 0) {
        for(let i=0 ; i<idsInCart.length ; i++) {
            total += parseInt(idsInCart[i].quantity)*parseInt(idsInCart[i].price);
            nbItemInCart += parseInt(idsInCart[i].quantity);
        }
    }
    $totalPriceInCart.text(total+',00 €');
}
/* Modify quantity in cart by row */
function modifyQuantity(val, idProductClicked) {
    let find = idsInCart.find(product => product.id == idProductClicked); 
    find.quantity = parseInt(val.value);
    $('tbody').find(`tr[data-id=${idProductClicked}]`).children('td.product-total-price').text(find.quantity*find.price+',00 €'); // Modify total price
    totalAmount();
    $nbOfElements.text(nbItemInCart);
    maxReached();
}
/* Remove product reference from cart */
function deleteRow(idProductClicked) {
    let find = idsInCart.find(product => product.id == idProductClicked);
    let index = idsInCart.indexOf(find);
    idsInCart.splice(index, 1); // Remove the product in idsCart array

    $('tbody').find(`tr[data-id=${idProductClicked}]`).remove(); // Remove from the dom
    totalAmount();
}
/* Disable button add to cart if quantity max (5) is reached */
function maxReached() {
    for(let i=0 ; i< idsInCart.length ; i++) {
        let idProductConcerned = idsInCart[i].id;
            let buttonConcerned = $('.product-list').find(`h3[data-id=${idProductConcerned}]`).parents('div.details-wrapper').children('button');
        if(idsInCart[i].quantity >=5) {
            buttonConcerned.attr('disabled', 'disabled')
        } else {
            buttonConcerned.removeAttr('disabled');
        }
    }
}

/* Add a product in cart or increment quantity */
$('.btn-add-cart').on('click', function() {
    //nbItemInCart++; // Increase number of items next icon in header
    //$nbOfElements.text(nbItemInCart);

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
                <td class="product-total-price">${productPrice},00 €</td>
                <td><i class="far fa-window-close" onclick="deleteRow(${idProductClicked});"></i></td>
            </tr>
        `);
        totalAmount();
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
        totalAmount();
    }
    $nbOfElements.text(nbItemInCart);
    maxReached();
});


/* Show Category */
$('.sidebar li').on('click', function() {
    let categoryClicked = $(this).text();
    $('.product').hide(); // Hide all the categories
    if(categoryClicked != 'all') {
        $('.product-list').find(`div[data-category=${categoryClicked}]`).show(); //Show the only selected
    }
    else {
        $('.product').show();
    }   
});
