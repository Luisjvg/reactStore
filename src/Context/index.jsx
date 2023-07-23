import { createContext, useState, useEffect } from 'react'
export const ShoppingCarContext = createContext()

export const ShoppingCarProvider = ({ children }) => {
    // Shopping Car * Increment quantity
    const [count, setCount] = useState(0)
    
    // Product Detail * Open/Close 
    const [isProductDetailOpen, setIsProductDetailOpen] = useState(false)
    const openProductDetail = () => setIsProductDetailOpen(true)
    const closeProductDetail = () => setIsProductDetailOpen(false)
    
    //Checkout Side Menu * Open/Close
    const [isCheckoutSideMenuOpen, seIsCheckoutSideMenuOpen] = useState(false)
    const openCheckoutSideMenu = () => seIsCheckoutSideMenuOpen(true)
    const closeCheckoutSideMenu = () => seIsCheckoutSideMenuOpen(false)

    // Product Detail * Show Product
    const [productToShow, setproductToShow] = useState({})
    
    // Shopping Car * Add products to car
    const [carProducts, setCarProducts] = useState([])

    // Shopping Car * Order
    const [order, setOrder] = useState([])

    // Get products
    const [items, setItems] = useState(null);

    // Get filtered products
    const [filteredItems, setFilteredItems] = useState(null);

    // Get products by titles
    const [searchByTitle, setSearchByTitle] = useState(null);
    
    const [searchByCategory, setSearchByCategory] = useState(null);

    useEffect(() => {
      fetch('https://api.escuelajs.co/api/v1/products')
      .then(res => res.json())
      .then(data => setItems(data))
    }, [])

    const filteredItemsByTitel = (items, searchByTitle) => {
        return items?.filter(item => item.title.toLowerCase().includes(searchByTitle.toLowerCase()))
    }

    const filteredItemsByCategory = (items, searchByCategory) => {
        return items?.filter(item => item.category.name.toLowerCase().includes(searchByCategory.toLowerCase()))
    }

    const filterBy = (searchType, items, searchByTitle, searchByCategory) => {
        if(searchType === 'BY_TITLE'){
            return filteredItemsByTitel(items, searchByTitle)
        }
        if(searchType === 'BY_CATEGORY'){
            return filteredItemsByCategory(items, searchByCategory)
        }
        if(searchType === 'BY_TITLE_AND_CATEGORY'){
            return filteredItemsByCategory(items, searchByCategory).filter(item => item.title.toLowerCase().includes(searchByTitle.toLowerCase()))
        }
        if(!searchType){
            return items
        }
    }

    useEffect(() => {
        if(searchByTitle && searchByCategory){
            setFilteredItems(filterBy('BY_TITLE_AND_CATEGORY', items, searchByTitle, searchByCategory))
        }
        if(searchByTitle && !searchByCategory){
            setFilteredItems(filterBy('BY_TITLE', items, searchByTitle, searchByCategory))
        }
        if(!searchByTitle && searchByCategory){
            setFilteredItems(filterBy('BY_CATEGORY', items, searchByTitle, searchByCategory))
        }
        if(!searchByTitle && !searchByCategory){
            setFilteredItems(filterBy(null, items, searchByTitle, searchByCategory))
        }
      }, [items, searchByTitle, searchByCategory])

    return(
        <ShoppingCarContext.Provider value={{
            count,
            setCount,
            openProductDetail,
            closeProductDetail,
            isProductDetailOpen,
            productToShow,
            setproductToShow,
            carProducts,
            setCarProducts,
            isCheckoutSideMenuOpen,
            openCheckoutSideMenu,
            closeCheckoutSideMenu,
            order,
            setOrder,
            items,
            setItems,
            searchByTitle,
            setSearchByTitle,
            filteredItems,
            setFilteredItems,
            searchByCategory,
            setSearchByCategory
        }}>
            {children}
        </ShoppingCarContext.Provider>
    )
}