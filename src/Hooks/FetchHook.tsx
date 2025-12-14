import { useState , useCallback} from "react";
import  type {Item} from "./Api";
import { useNavigate } from "react-router-dom";



interface ApiData  {
    recipes: Item[]
}

// 2. Define the main FetchResult that matches the API response structure
interface FetchResult {
    status: string;
    results: number;
    data: ApiData; // It is 'data', not 'products'
}

export default function useFetch():[boolean, string | null, Item[], (url: string) => Promise<void>]{

    const [loading, setLoading ] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData ] = useState<Item[]>([]);
    // const navigate = useNavigate();


    const fetchData = useCallback(async (url: string) => {
        setLoading(true);

        try{
            const response =  await fetch(url, {}); // Use the dynamic URL passed in
            const result: FetchResult = await response.json();
            
            setData(result.data.recipes);
            // navigate('/');

        }catch(e){
            setError((e as Error).message);
        } finally {
            setLoading(false);
        }
    }, []); // fetchData only depends on functions inside its scope, so the dependency array is empty


    // useEffect(() => {
    //     async function fetchData(){

    //     setLoading(true);

    //         try{

    //             const response =  await fetch(url, {...options });
    //             const result: FetchResult = await response.json();
                
    //             setData(result.products);
    //             setLoading(false);

    //         }catch(e){

    //             setError((e as Error).message);
    //             setLoading(false);
    //             }
    //     } 
    //     fetchData();
    // }, []);
        
        return [loading, error, data, fetchData]
}