import React from "react";
import { useLocation } from "react-router";

export function useQuery(whatQuery: string) {
   const { search } = useLocation();
   const getSearch = React.useMemo(() => new URLSearchParams(search), [search]);
   return getSearch.get(whatQuery);
}
