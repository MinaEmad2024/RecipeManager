import { useContext } from "react"
import { GlobalContext } from "../gcontext"
import RecipeItem from "../gcomponents/RecipeItem"

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);

  if (context === null) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }

  return context; // TypeScript now knows this is definitively GlobalContextType
};


export default function Home(){

    const { data, loading } = useGlobalContext();

    if (loading) return <div>Data is Loading please wait </div>

    return <div className="py-8 container mx-auto flex flex-wrap justify-center gap-10">
        {
            data && data.length > 0 
            ? data.map(
                (item, index) => <RecipeItem  key={index} item={item} />
            )
            :<div>
                <p 
                className="lg:text-4xl text-xl text-center text-black font-extrabold"
                >No result is found </p>
            </div>
        }
    </div>
}