import { useContext, useEffect } from "react";
import { GlobalContext } from "../gcontext";
import { useParams } from "react-router-dom";

interface Ingredient {
    quantity: number;
    unit: string;
    description: string;
}

export interface Recipe {
    publisher: string;
    ingredients : Ingredient[];
    source_url: string;
    image_url: string;
    title: string ;
    servings: string;
    cooking_time: string;
    id:string;

}

interface Data{
    recipe: Recipe
}

interface ApiResponse {
    status: string;
    data: Data
}

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);

  if (context === null) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }

  return context; // TypeScript now knows this is definitively GlobalContextType
};


export default function Details(){


    const {id} = useParams()

    const {recipeDetailsData, setRecipeDetailsData, addToFavoriteList , favoriteList} = useGlobalContext()

    useEffect(() => {
        async function getRecipeDetails() {
            
            const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`);
            const data : ApiResponse = await res.json();
            console.log(data)
            if(data?.data){
                setRecipeDetailsData(data?.data.recipe)
            }
        }  
        getRecipeDetails();
        
        console.log(recipeDetailsData, id);
    }, [])

    return <div className="container mx-auto py-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="row-start-2 lg:row-start-auto">
            <div className="h-96 overflow-hidden rounded-xl group ">
                <img src={recipeDetailsData?.image_url} 
                alt={recipeDetailsData?.title} 
                className="w-full h-full object-cover block group-hover:scale-105 duration-300" />
            </div>
        </div>
        <div className="flex flex-col gap-3">
            <span className="text-sm text-cyan-700 font-medium ">{recipeDetailsData?.publisher}</span>
            <h3 className="font-bold text-2xl truncate text-black">{recipeDetailsData?.title}</h3>
            <div>
                <button
                    className="p-3 px-8 rounded-lg text-sm uppercase font-medium tracking-wider mt-3 inline-block shadow-md bg-black text-white"
                    onClick={() => {
                        if(recipeDetailsData){
                            addToFavoriteList(recipeDetailsData)

                        }
                    }}
                >
                    {
                       favoriteList && favoriteList.length > 0 
                       && favoriteList.findIndex(item => item.id === recipeDetailsData?.id ) !== -1 
                        ? 'Remove From Favorites'
                        :'Save to Favorites'
                    }                  
                </button>
            </div>
            <div>
                <span className="text-2xl font-semibold text-black">ingredients:</span>
                <ul className="flex flex-col gap-3 ">{
                        recipeDetailsData?.ingredients?.map(
                            ingredient => <li>
                                <span className="text-2xl font-semibold text-black">{ingredient.quantity} {ingredient.unit}</span>
                                <span className="text-2xl font-semibold text-black">{ingredient.description}</span>
                            </li>
                        )
                    }</ul>
            </div>
        </div>
    </div>
}