import React, { useContext, useEffect, useState } from "react";
import GlobalContext from "../context/GlobalContext";
import CalendarHeader from "./CalendarHeader";
import DailyList from "./DailyList";
import EventModal from "./EventModal";
import FavoritesModal from "./FavoritesModal";
import Sidebar from "./Sidebar";
import WeeklyList from "./WeeklyList";
import {useNavigate} from 'react-router-dom';
import axios from 'axios'

export default function RecipeCollection() {
    const URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000"

    const [ searchInput, setSearchInput ] = useState('');
    const [ buttonText, setButtonText ] = useState('Add to Calendar');
    const [ title, setTitle ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ instructions, setInstructions ] = useState('');
    const { showEventModal, showDailyModal, showWeeklyModal, showFavoritesModal } = useContext(GlobalContext);
    const { token, daySelected, dispatchCalEvent } = useContext(GlobalContext);
    const [recipes,setRecipes] = useState([
        {
            title: "Stracciatella (Italian Wedding Soup)",
            ingredients: "3 1/2 c Chicken broth; homemade|1 lb Fresh spinach; wash/trim/chop|1 Egg|1 c Grated parmesan cheese; --or--|1 c Romano cheese; freshly grated|Salt and pepper; to taste",
            servings: "4 servings",
            instructions: "Bring 1 cup of the broth to a boil. Add spinach and cook until softened but still bright green. Remove spinach with a slotted spoon and set aside. Add remaining broth to pot. Bring to a boil. Meanwhile, beat egg lightly with a fork. Beat in 1/4 cup of cheese. When broth boils pour in egg mixture, stirring constantly for a few seconds until it cooks into rags. Add reserved spinach, salt and pepper. Serve immediately, passing remaining cheese. NOTES: Someone asked for this recipe a while back. I believe this soup, known as 'Stracciatella' is synonymous with Italian Wedding Soup, however, I seem to remember from I-don't-know-where that Italian Wedding Soup is the same as this but with the addition of tiny meatballs."
        },
        {
            title: "Italian Wedding Soup",
            ingredients: "1/2 lb Ground beef|1/2 lb Ground veal|1/4 c Italian seasoned bread crumb|1 Egg|1 tb Parsley|Salt and pepper to taste|4 c Chicken broth|2 c Spinach leaves cut into piec|1/4 c Grated Pecorino Romano chees",
            servings: "1 Servings",
            instructions: "Combine the ground meat, bread crumbs, egg, parsley, salt and pepper in a bowl. Mix well and form into tiny meat balls. Bake on a cookie sheet for 30 minutes at 350F. Meanwhile, bring broth to a boil and add spinach. Cover and boil for 5 minutes. Add the meatballs to the hot broth, bring to a simmer. Stir in the cheese and serve immediately. Rita in Scottsdale 01/02/92 01:41 am"
          },
          {
            title: "Stracciatella (Italian Wedding Soup)",
            ingredients: "1 lb Fresh spinach, washed and chopped|1 Egg|1 c Parmesan cheese, * see note|Salt, to taste|Pepper, to taste",
            servings: "6 Servings",
            instructions: "Bring 1 cup of the broth to a boil. Add spinach and cook until softened but still bright green. Remove spinach with a slotted spoon and set aside. Add remaining broth to pot. Bring to a boil. Meanwhile, beat egg lightly with a fork. Beat in 1/4 cup of cheese. When broth boils pour in egg mixture, stirring constantly for a few seconds until it cooks into rags. Add reserved spinach, salt and pepper. Serve immediately, passing remaining cheese."
          },
          {
            title: "Italian Wedding Soup",
            ingredients: "2 qt Chicken stock|1 Chopped carrot|1/2 Chopped onion|1 Chopped celery|2 oz Ground meat; (or ground vegieburger can be used)|1 Egg|1 Sprig of chopped parsely",
            servings: "4 - 6 servin",
            instructions: "Bring chicken stock to a boil add the chopped carrot,celery and onion and lower heat. Combine ground meat or vegieburger, egg, and parsely, the consistancy of the mixture is kinda loose. Drop in small pieces of the meat mixture, not much larger than a Tablespoon. (making tiny meatballs.) Turn up the heat and bring to a boil,5 -7 minutes, it is ready when the little meatballs float to the surface."
          },
    ])

    const navigate = useNavigate();
    useEffect( () => {
        if (token === null){
            navigate('/login')
        }
    },[])

    useEffect(() => {
        const timer = setTimeout(() => {
            setButtonText("Add To Calendar");
        }, 500);
        return () => clearTimeout(timer);
    }, [ buttonText ]);

    const handleChange = (event) => {
        setSearchInput(event.target.value);
    };

    let dataSearch = recipes.filter(item => {
        return Object.keys(item).some(key =>
            item[key].toString().toLowerCase().includes(searchInput.toString().toLowerCase())
        )
    });

    async function handleSearch(e) {
        e.preventDefault();
        const url = `${URL}/api/api/recipe?name=${searchInput}` 
        const options = {
            headers:{
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + token
            }
        }
        const res = await axios.get(url,options)
        setRecipes(res.data)
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setButtonText("Added");
        const body = {
            name:title,
            ingredients:description.split('|'),
            instructions,
            date:new Date(daySelected),
            color:"indigo"}
        const options = {
            headers:{
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + token
            }
        }
        const url = `${URL}/api/info`
        const res = await axios.post(url,body,options)
        const calendarEvent = {
            title,
            description,
            instructions,
            label: "indigo",
            day: daySelected.valueOf(),
            id: res.data.info._id,
        };
        dispatchCalEvent({ type: "push", payload: calendarEvent });
    }

    return (
        <React.Fragment>
            {showEventModal && <EventModal />}
            {showDailyModal && <DailyList />}
            {showWeeklyModal && <WeeklyList />}
            {showFavoritesModal && <FavoritesModal />}

            <div className = "h-screen flex flex-col">
                <CalendarHeader />
                <div className = "flex flex-col flex-1 md:flex-row">
                    <div classname = "shrink-0">
                        <Sidebar />
                    </div>
                    <div className = "flex flex-col w-full border-t">
                        <form className = "flex justify-center items-center w-full">
                            <input 
                                type = "text"
                                placeholder = "Search Recipe..."
                                value = {searchInput}
                                onChange = {handleChange.bind(this)}
                                className = "w-1/2 mt-3 mr-3 focus:ring-green-800 focus:border-green-800 focus:outline-none rounded"
                            />
                            <button
                                type = "submit"
                                onClick = {handleSearch}
                                className = "bg-green-800 hover:bg-green-900 px-6 py-2 mt-3 rounded text-white"
                            >
                                <span className = "hidden sm:block">
                                    Search
                                </span>
                                <span className = "material-icons-outlined block sm:hidden">
                                    search
                                </span>
                            </button>
                        </form>
                        <div className = "grid grid-cols-1 gap-10 p-6 xl:grid-cols-2">

                            {dataSearch.map(recipe => 
                                <form 
                                    key = {recipe}
                                    onMouseOver = {() => {
                                        setTitle(recipe.title);
                                        setDescription(recipe.ingredients);
                                        setInstructions(recipe.instructions);
                                    }}
                                    className = "border rounded-lg bg-gray-100 p-4 group hover:bg-gray-200 max-h-64 md:max-h-72 xl:max-h-80 2xl:max-h-96 overflow-auto drop-shadow-lg text-sm sm:text-sm lg:text-md 2xl:text-base"
                                >
                                    <div className = "flex justify-between mb-3 border border-t-0 border-x-0 border-b-2 border-green-800">
                                        <p className = "text-lg sm:text-xl 2xl:text-2xl my-3">{ recipe.title }</p>
                                        <div className = "flex flex-col justify-center">
                                            <button
                                                type = "submit"
                                                onClick = {handleSubmit}
                                                className = "bg-green-800 hover:bg-green-900 px-6 py-2 mb-3 rounded text-white hidden group-hover:block"
                                            >
                                                { buttonText }
                                            </button>
                                        </div>
                                    </div>
                                    <div className = "grid grid-cols-3 overflow-auto">
                                        <p className = "text-left font-bold">Serving Size:</p>
                                        <p className = "col-span-2">{ recipe.servings }</p>
                                        <p className = "text-left font-bold border-b border-gray-300 pb-3">Ingredients:</p>
                                        <p className = "col-span-2 border-b border-gray-300 pb-3">{ recipe.ingredients }</p>
                                        <p className = "text-left font-bold mt-3">Instructions:</p>
                                        <p className = "col-span-2 text-left mt-3">{ recipe.instructions }</p>
                                    </div>
                                </form>    
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}