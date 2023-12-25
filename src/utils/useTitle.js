import { useEffect } from "react";

export default function useTitle(pageTitle) {
  useEffect(() => {
    pageTitle && (document.title = pageTitle);
  }, [pageTitle]);
}
