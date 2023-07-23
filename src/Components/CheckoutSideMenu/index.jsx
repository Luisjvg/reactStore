import { useContext } from 'react';
import { Link } from 'react-router-dom'
import { ShoppingCarContext } from '../../Context'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { totalPrice } from '../../Utils'
import OrderCard from '../../Components/OrderCard';
import './styles.css'

const CheckoutSideMenu = () => {
    const context = useContext(ShoppingCarContext)

    const handleDelete = (id) => {
        const filteredProducts = context.carProducts.filter(product => product.id != id)
        context.setCarProducts(filteredProducts)
    }

    const handleCheckout = () => {
        const orderToAdd = {
            date: '01.02.23',
            products: context.carProducts,
            totalProducts: context.carProducts.length,
            totalPrice: totalPrice(context.carProducts)
        }

        context.setOrder([...context.order, orderToAdd])
        context.setCarProducts([])
        context.setSearchByTitle(null)
    }

    return(
        <aside 
        className={`${context.isCheckoutSideMenuOpen ? 'flex' : 'hidden'} checkout-side-menu flex-col fixed right-0 bg-white border border-black rounded-lg`}>
            <div className='flex justify-between items-center p-6'>
                <h2 className='font-medium text-xl'>My Order</h2>
                <button onClick={() => context.closeCheckoutSideMenu()}>
                    <XMarkIcon className='h-6 w-6 text-black'/>
                </button>
            </div>
            <div className='px-6 overflow-y-scroll flex-1'>
                {
                context.carProducts.map(product => (
                    <OrderCard 
                    key={product.id}
                    id={product.id}
                    title={product.title}
                    imageUrl={product.images}
                    price={product.price}
                    handleDelete={handleDelete}
                    />
                ))
            }
            </div>
            <div className='px-6 mb-6'>
                <p className='flex justify-between items-center mb-2'>
                    <span className='font-light'>Total:</span>
                    <span className='font-medium text-2xl'>${totalPrice(context.carProducts)}</span>
                </p>
                <Link to='/my-orders/last'>
                <button
                className='w-full bg-black py-3 text-white rounded-lg' 
                onClick={() => handleCheckout()}>Checkout</button>
                </Link>
            </div>
        </aside>
    )
}

export default CheckoutSideMenu