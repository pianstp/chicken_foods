import { useEffect } from "react";

export default function usePageTitle(title) {
  useEffect(() => {
    document.title = `${title} | ChickenHub`;
    return () => { document.title = "ChickenHub"; };
  }, [title]);
}
