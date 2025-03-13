import { Link } from "react-router-dom"
import WcNavbar from "../components/WcNavbar"

const WelcomePage = () => {
  return (
    <div>
        <WcNavbar/>
        <div className="flex flex-col items-center">
            <div className="text-center my-10">
                <h1 className="text-3xl font-semibold">Welcome to iNTELLECTA, Jerry Hardy !</h1>
                <h5 className="text-[20px] mt-3">We’re excited to help you learn in a way that works best for you.</h5>
            </div>
            <div className="flex items-center">
                <div className="space-y-5">
                    <div className="flex items-center gap-2">
                        <div className="bg-[#F7D232] text-xl text-white px-4 py-2 text-center rounded-full">1</div>
                        <h4 className="text-center text-lg font-semibold">Take a quick assessment to personalize your learning.</h4>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="bg-[#F7D232] text-xl text-white px-4 py-2 text-center rounded-full">2</div>
                        <h4 className="text-center text-lg font-semibold">Get a custom learning path designed just for you.</h4>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="bg-[#F7D232] text-xl text-white px-4 py-2 text-center rounded-full">3</div>
                        <h4 className="text-center text-lg font-semibold">Learn with our AI tutor that adapts to how you learn best.</h4>
                    </div>
                    <div className="flex justify-center flex-col items-center">
                        <Link to="/assessment">
                        <button className="bg-[#F7D232] p-2 rounded-md text-lg shadow-md cursor-pointer font-semibold">Get Started</button>
                        </Link>
                        <p className="my-3">Intial assessment takes about 15 minutes</p>
                    </div>
                </div>
                <div>
                    <img src="welcome-bg.png" alt="" />
                </div>
            </div>
        </div>
    </div>
  )
}

export default WelcomePage