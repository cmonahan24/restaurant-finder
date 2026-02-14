javascriptimport { useCallback, useState } from "react"
import Confetti from "react-confetti"
import RestaurantCard from "../components/RestaurantCard"

function Choose() {
  const [loading, setLoading] = useState(false)
  const [showSettings, setShowSettings] = useState(true)
  const [location, setLocation] = useState("")
  const [categories, setCategories] = useState("")
  const [restaurants, setRestaurants] = useState([])

  const fetchRestaurants = useCallback(async () => {
    if (!location.trim()) {
      alert("Please enter a location!")
      return
    }

    setLoading(true)
    setShowSettings(false)

    // If no category is specified, use "restaurants" to get all types
    const searchCategories = categories.trim() || "restaurants"
    
    const apiUrl = `${
      process.env.REACT_APP_API_URL
    }/api/yelp?location=${encodeURIComponent(
      location
    )}&categories=${encodeURIComponent(searchCategories)}`

    try {
      const response = await fetch(apiUrl)

      if (!response.ok) {
        throw new Error("Network error")
      }

      const data = await response.json()
      const restaurantData = data.businesses

      if (restaurantData.length === 0) {
        alert("No restaurants found! Try a different location or category.")
        setShowSettings(true)
      } else {
        setRestaurants(restaurantData)
      }
    } catch (error) {
      console.error(error)
      alert("Error loading restaurants. Please try again.")
      setShowSettings(true)
    }

    setLoading(false)
  }, [location, categories])

  const removeFromFront = () => {
    setRestaurants((prevRestaurants) => {
      const newRestaurants = [...prevRestaurants]
      newRestaurants.shift()
      return newRestaurants
    })
  }

  const removeFromBack = () => {
    setRestaurants((prevRestaurants) => {
      const newRestaurants = [...prevRestaurants]
      newRestaurants.pop()
      return newRestaurants
    })
  }

  const redirect = (url) => {
    window.open(url, "_blank")
  }

  const resetSearch = () => {
    setRestaurants([])
    setShowSettings(true)
  }

  // Settings screen
  if (showSettings) {
    return (
      <div className="flex flex-col justify-center items-center w-full h-full bg-red-200 gap-8 p-4 md:p-8">
        <h1 className="text-4xl md:text-6xl font-black text-white uppercase text-center">Find Restaurants</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Your Location *
            </label>
            <input
              type="text"
              placeholder="e.g., Starkville, MS or 39759"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && fetchRestaurants()}
            />
            <p className="text-xs text-gray-500 mt-1">City, state, or zip code</p>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Category (optional)
            </label>
            <input
              type="text"
              placeholder="e.g., pizza, sushi, burgers (leave blank for all)"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300"
              value={categories}
              onChange={(e) => setCategories(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && fetchRestaurants()}
            />
            <p className="text-xs text-gray-500 mt-1">Leave blank to see all restaurants</p>
          </div>

          <button
            className="w-full px-6 py-4 bg-red-300 text-white rounded-lg shadow-md transition-all duration-300 hover:bg-red-400 hover:shadow-lg font-bold text-lg uppercase"
            onClick={fetchRestaurants}
            disabled={loading}
          >
            {loading ? "Loading..." : "Find Restaurants"}
          </button>
        </div>

        <div className="text-white text-sm mt-4">
          <p className="font-bold mb-2">Popular categories:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {["pizza", "burgers", "sushi", "chinese", "mexican", "italian", "thai", "bbq"].map(cat => (
              <button
                key={cat}
                className="px-3 py-1 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-all"
                onClick={() => setCategories(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Loading screen
  if (loading || restaurants.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center w-full h-full bg-red-200 gap-12">
        <div className="text-white text-2xl">Loading restaurants...</div>
      </div>
    )
  }

  // Restaurant selection screen
  return (
    <>
      <div className="flex flex-col justify-start items-center w-full min-h-screen bg-red-200 gap-4 py-4 overflow-y-auto">
        <button
          className="self-start ml-4 mt-4 px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-all"
          onClick={resetSearch}
        >
          ← New Search
        </button>

        {restaurants.length > 1 ? (
          <div className="flex flex-col w-full items-center gap-6 px-4 pb-8">
            <div className="w-full max-w-sm">
              <RestaurantCard
                restaurant={restaurants[0]}
                onClick={removeFromBack}
              />
            </div>

            <h1 className="text-4xl font-black text-white my-4">OR</h1>

            <div className="w-full max-w-sm">
              <RestaurantCard
                restaurant={restaurants[restaurants.length - 1]}
                onClick={removeFromFront}
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center w-full gap-8 px-4 py-8">
            <Confetti />

            <h1 className="text-5xl font-black text-white animate-bounce text-center">
              Winner!
            </h1>
            <div className="w-full max-w-sm">
              <RestaurantCard
                restaurant={restaurants[0]}
                onClick={() => {
                  redirect(restaurants[0].url)
                  console.log(restaurants[0].url)
                }}
              />
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Choose
