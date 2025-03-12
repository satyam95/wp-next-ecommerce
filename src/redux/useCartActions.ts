import { v4 as uuidv4 } from "uuid";
import { useMutation, useQuery } from "@apollo/client";

import { ADD_TO_CART_MUTATION } from "@/apollo/mutations/addToCart";
import { GET_CART } from "@/apollo/queries/getCart";
import { useAppDispatch } from "./hooks";
import { setCart } from "./cartSlice";
import { REMOVE_ITEMS_FROM_CART } from "@/apollo/mutations/removeItemsFromCart";
import { EMPTY_CART } from "@/apollo/mutations/emptyCart";
import { UPDATE_CART_ITEM_QUANTITIES } from "@/apollo/mutations/updateCartItemQuantities";

export const useCartActions = () => {
  const dispatch = useAppDispatch();

  const { refetch } = useQuery(GET_CART, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      dispatch(setCart(data.cart));
    },
  });

  const [
    addToCartMutation,
    { loading: addToCartLoading, error: addToCartError },
  ] = useMutation(ADD_TO_CART_MUTATION, {
    onCompleted: (data) => {
      if (data && data.addToCart && data.addToCart.cartItem) {
        const cartItem = data.addToCart.cartItem;
        console.log("Added item:", cartItem);
      } else {
        throw new Error("Invalid response from addToCart mutation.");
      }
      refetch();
    },
    onError: (error) => {
      console.error("Error adding to cart:", error);
    },
  });

  const [
    removeItemsFromCart,
    { loading: removeItemsLoading, error: removeItemsError },
  ] = useMutation(REMOVE_ITEMS_FROM_CART, {
    onCompleted: (data) => {
      if (
        data &&
        data.removeItemsFromCart &&
        data.removeItemsFromCart.cartItems
      ) {
        const cartItems = data.removeItemsFromCart.cartItems;
        console.log("Removed items:", cartItems);
      }
      refetch();
    },
    onError: (error) => {
      console.error("Error removing items from cart:", error);
    },
  });

  const [
    UpdateCartItemQuantities,
    { loading: updateItemQtyLoading, error: updateItemQtyError },
  ] = useMutation(UPDATE_CART_ITEM_QUANTITIES, {
    onCompleted: (data) => {
      if (
        data &&
        data.updateItemQuantities &&
        data.updateItemQuantities.items
      ) {
        const itemUpdated = data.updateItemQuantities.items;
        console.log("Update item:", itemUpdated);
      }
      refetch();
    },
    onError: (error) => {
      console.error("Error in updating item quantity in cart:", error);
    },
  });

  const [emptyCart, { loading: clearCartLoading, error: clearCartError }] =
    useMutation(EMPTY_CART, {
      onCompleted: (data) => {
        if (data && data.emptyCart && data.emptyCart.cart) {
          const cartEmpty = data.emptyCart.cart;
          console.log("Empty Cart:", cartEmpty);
        }
        refetch();
      },
      onError: (error) => {
        console.error("Error in empting in cart:", error);
      },
    });

  const addToCart = async (
    productId: number,
    quantity: number,
    extraData?: string
  ) => {
    try {
      const clientMutationId = uuidv4();
      await addToCartMutation({
        variables: {
          clientMutationId,
          productId,
          quantity,
          extraData,
        },
      });
    } catch (e) {
      console.error("Error adding to cart:", e);
      throw e;
    }
  };

  const removeItemFromCart = async (keys: string[]) => {
    try {
      const clientMutationId = uuidv4();
      await removeItemsFromCart({
        variables: {
          clientMutationId,
          keys,
          all: false,
        },
      });
    } catch (e) {
      console.error("Error removing item from cart:", e);
      throw e;
    }
  };

  const clearCart = async () => {
    try {
      const clientMutationId = uuidv4();
      await emptyCart({
        variables: {
          clientMutationId,
          clearPersistentCart: true,
        },
      });
    } catch (e) {
      console.error("Error in emptying cart:", e);
      throw e;
    }
  };

  const updateCartItemQty = async (key: string, quantity: number) => {
    try {
      const clientMutationId = uuidv4();
      await UpdateCartItemQuantities({
        variables: {
          clientMutationId,
          key,
          quantity,
        },
      });
    } catch (e) {
      console.error("Error updating item quantity:", e);
      throw e;
    }
  };

  return {
    addToCart,
    removeItemFromCart,
    updateCartItemQty,
    clearCart,
    loading:
      addToCartLoading ||
      removeItemsLoading ||
      updateItemQtyLoading ||
      clearCartLoading,
    error:
      addToCartError ||
      removeItemsError ||
      updateItemQtyError ||
      clearCartError,
  };
};
