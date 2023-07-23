/**
 * This function calculates total price of a new order
 * @param {Array} products carProduct: Array of Objects
 * @returns {number} Total Price
 */

export const totalPrice = (products) => {
    
    let sum = 0
    products.forEach(product => sum += product.price);
    return sum

    // Formas de hacer lo mismo pero con for, iteramos cada product y luego creamos una var 'suma' donde le asignamero el precio.

    //let sum = 0
    // for(let i = 0; i < products.length; i++){
    //     const product = products[i]
    //     const suma = sum += product.price
    // }
    // console.log(sum)

    // Formas de hacer lo mismo pero mas largo. guardamos products en una var y luego creamos un objeto nuevo que sacaremos solamente el precio 'algo'. Luego le aplicamos reduce para obtener 1 solo valor.

    // const precios = products
    // const algo = precios.map(precio => precio.price)

    // const total = algo.reduce((sum, item) => sum + item, 0)

    // console.log(total)
}