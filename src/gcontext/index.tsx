import { createContext, useCallback, useState } from "react"
import type {ReactNode, Dispatch, SetStateAction, FormEvent } from "react"
import useFetch from "../Hooks/FetchHook";
import type { Item } from "../Hooks/Api";
import type {Recipe} from "../Pages/detailsPage"

interface GlobalContextType {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  loading: boolean; // Add loading state to context
  error: string | null; // Add error state to context
  data: Item[]; // Add data state to context
  recipeDetailsData: Recipe| null;
  setRecipeDetailsData:Dispatch<SetStateAction<Recipe | null>>;
  favoriteList: Recipe[]; // Add favoriteList to the context type
  setFavoriteList: Dispatch<SetStateAction<Recipe[]>>;
  addToFavoriteList: (currentItem: Recipe) => void; // Add the function type

};

export const GlobalContext = createContext<GlobalContextType | null>(null);


interface GlobalStateProps {
  children: ReactNode;
} 



export default function GlobalState({children } : GlobalStateProps){

    const [search, setSearch ] = useState('');
    const [loading, error, data, triggerFetch] = useFetch();
    const [recipeDetailsData, setRecipeDetailsData ] = useState<Recipe | null>(null);
    const [favoriteList, setFavoriteList ] = useState<Recipe[]>([])


        // The base URL for the API
    const API_BASE_URL = `https://forkify-api.herokuapp.com/api/v2/recipes?search=`;


    const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Stop the default browser refresh
        
        // Construct the URL using the current 'search' state value
        const targetUrl = `${API_BASE_URL}${search}`; 
        
        // console.log("Submitting URL:", targetUrl);

        // Trigger the fetch manually with the new URL
        triggerFetch(targetUrl); 
        setSearch('');
        

    }, [search, triggerFetch]); // Dependencies needed for useCallback


    function addToFavoriteList(currentItem : Recipe ){
      // console.log(currentItem);
      const copyFavoriteList = [...favoriteList];
      const index = copyFavoriteList.findIndex(item => item.id === currentItem.id );
      if (index === -1) {
        copyFavoriteList.push(currentItem);
      }else{
        copyFavoriteList.splice(index, 1);
      };
      setFavoriteList(copyFavoriteList);
    }

    console.log(data, favoriteList )


    return<GlobalContext.Provider value={{search, 
    setSearch, 
    handleSubmit,
     recipeDetailsData,
      favoriteList,
      setFavoriteList,
      setRecipeDetailsData,
      addToFavoriteList,
      loading,
      error,
      data}}  >
            {children}
    </GlobalContext.Provider>
}