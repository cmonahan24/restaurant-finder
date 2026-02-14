import { useNavigate } from "react-router-dom"

function Home() {
  const navigate = useNavigate()

  return (
    <>
      <div className="flex flex-col justify-center items-center w-full h-full bg-red-200 gap-8 md:gap-12 px-4">
        <div className="flex flex-col md:flex-row justify-center items-center w-full gap-4 md:gap-12">
          <img className="w-32 h-32 md:w-48 md:h-48" src="/assets/cook.svg" alt="logo" />
          <h1 className="text-5xl md:text-8xl font-black text-white uppercase">Yums</h1>
        </div>

        <button
          className="px-16 md:px-24 py-3 md:py-4 bg-white rounded-full shadow-sm transition-shadow duration-300 hover:shadow-lg active:scale-95"
          onClick={() => navigate("/choose")}
        >
          <h1 className="text-xl md:text-2xl font-bold text-red-300 uppercase">Play</h1>
        </button>
      </div>
    </>
  )
}

export default Home