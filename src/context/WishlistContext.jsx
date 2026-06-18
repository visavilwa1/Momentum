import { createContext, useContext, useState, useEffect } from "react";

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [ids, setIds] = useState(() => {
    try {
      const stored = localStorage.getItem("wishlist");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(ids));
  }, [ids]);

  const toggle = (id) =>
    setIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  const remove = (id) => setIds((prev) => prev.filter((x) => x !== id));

  const isWishlisted = (id) => ids.includes(id);

  return (
    <WishlistContext.Provider value={{ ids, toggle, remove, isWishlisted }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used inside WishlistProvider");
  return ctx;
}
