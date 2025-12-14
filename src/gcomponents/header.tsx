import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { GlobalContext } from "../gcontext";


export const useGlobalContext = () => {
  const context = useContext(GlobalContext);


  if (context === null) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }

  return context; // TypeScript now knows this is definitively GlobalContextType
};


export default function Header(){

    const {search, setSearch, handleSubmit} = useGlobalContext();
    // console.log(search);


    return <nav className="flex justify-between items-center py-8 container mx-auto flex-col lg:flex-row gap-5 lg:gap-0 ">
        <h2 className="text-2xl font-semibold">RecipeManager</h2>
        <form onSubmit={handleSubmit}>
            <input
            type="text"
            name="search"
            placeholder="Enter Name ..."
            className="bg-white/75 p-3 px-8 rounded-full outline-none lg:w-96 shadow-lg shadow-red-100 focus:shadow-red-200"
            value={search}
            onChange={(event)=> setSearch(event.target.value)}
            />
        </form>
        <ul className="flex gap-5">
            <li>
                <NavLink
                to={'/'}
                className='text-block hover:text-gray-700 duration-300'
                >Home
                </NavLink>
            </li>
                <li>
                <NavLink
                to={'/favorites'}
                className='text-block hover:text-gray-700 duration-300'
                >favorites
                </NavLink>
            </li>
        </ul>
    </nav>
}