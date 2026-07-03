import { createContext, useContext, useEffect, useState } from "react";
import {
  getCart,
  addToCart as addCartApi,
  updateCart,
  removeCartItem,
} from "../config/axios";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch Cart
  const fetchCart = async () => {
    try {
      setLoading(true);

      const data = await getCart();

      setCart(data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Add Product
const addToCart = async (productId, quantity = 1) => {
  try {
    await addCartApi({
      product_id: productId,
      quantity,
    });

    await fetchCart();
  } catch (error) {
    console.log(error);
    throw error;
  }
};


  // Increase Quantity
const increaseQuantity = async (productId, quantity) => {
  // Optimistic Update
  setCart((prev) =>
    prev.map((item) =>
      item.product_id === productId
        ? { ...item, quantity: quantity + 1 }
        : item
    )
  );

  try {
    // console.log("Updating cart for productId:", productId, "to quantity:", quantity + 1);
    await updateCart(productId, quantity + 1);
  } catch (error) {
    console.log(error);

    // Rollback
    setCart((prev) =>
      prev.map((item) =>
        item.product_id === productId
          ? { ...item, quantity }
          : item
      )
    );
  }
};

  // Decrease Quantity
 const decreaseQuantity = async (productId, quantity) => {
  if (quantity <= 1) {
    removeFromCart(productId);
    return;
  }

  setCart((prev) =>
    prev.map((item) =>
      item.product_id === productId
        ? { ...item, quantity: quantity - 1 }
        : item
    )
  );

  try {
    await updateCart(productId, quantity - 1);
  } catch (error) {
    console.log(error);

    setCart((prev) =>
      prev.map((item) =>
        item.product_id === productId
          ? { ...item, quantity }
          : item
      )
    );
  }
};

  // Remove Product
  const removeFromCart = async (productId) => {
    try {
      setLoading(true)
      await removeCartItem(productId);

      await fetchCart();
    } catch (error) {
      console.log(error);
    }
    finally{
      setLoading(false)
    }
  };

  // Total Items
  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Total Price
  const totalPrice = cart.reduce(
  (total, item) =>
    total + Number(item.current_price) * item.quantity,
  0
);

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        fetchCart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        totalItems,
        totalPrice,
        loading
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);