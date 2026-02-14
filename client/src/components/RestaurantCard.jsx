const RestaurantCard = ({ restaurant, onClick }) => {
  return (
    <div
      className="flex flex-col w-full bg-white rounded-2xl shadow-lg cursor-pointer transition-transform duration-300 active:scale-95 overflow-hidden"
      onClick={onClick}
    >
      <img
        src={restaurant.image_url}
        className="w-full h-48 object-cover"
        alt={`${restaurant.name}_logo`}
      />
      <div className="flex flex-col p-4 gap-2">
        <div className="flex justify-between items-start gap-2">
          <h1 className="text-lg font-bold text-red-200 flex-1">
            {restaurant.name} 🎀
          </h1>
          <h1 className="text-lg font-bold text-red-400 flex-shrink-0">{restaurant.price}</h1>
        </div>
        <h1 className="text-base font-medium text-red-400">
          ⭐ {restaurant.rating}
        </h1>
        <div className="flex flex-wrap gap-1">
          {restaurant.categories.map((category, i) => (
            <span key={i} className="text-sm font-medium text-red-300">
              {category.title}
              {i !== restaurant.categories.length - 1 ? " 🎀" : ""}
            </span>
          ))}
        </div>
        <h1 className="text-sm font-thin text-red-400 mt-2 text-right">
          {restaurant.location.address1}
        </h1>
      </div>
    </div>
  )
}

export default RestaurantCard