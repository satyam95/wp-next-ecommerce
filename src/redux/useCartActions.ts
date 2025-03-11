import { v4 as uuidv4 } from "uuid";
import { useMutation, useQuery } from "@apollo/client";

import { ADD_TO_CART_MUTATION } from "@/apollo/mutations/addToCart";
import { GET_CART } from "@/apollo/queries/getCart";
import { useAppDispatch } from "./hooks";
import { setCart } from "./cartSlice";

export const useCartActions = () => {
    const dispatch = useAppDispatch();

  const { refetch } = useQuery(GET_CART, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      dispatch(setCart(data.cart))
    },
  });

  const [addToCartMutation, { loading, error }] = useMutation(
    ADD_TO_CART_MUTATION,
    {
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
    }
  );

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

  return { addToCart, loading, error };
};
