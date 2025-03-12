import IntellectaLogo from "../../assets/Intellecta-logo.svg"

const Signup = () => {
  return (
    <div className="bg-[#FFEDAC] w-full h-screen">
        <div>
            <h1 className="text-5xl">Intellecta</h1>
            <div>
                <img src={IntellectaLogo} alt="" />
            </div>
            <div>
                <img src="/signup-bg.png" alt="" />
            </div>
        </div>
    </div>
  )
}

export default Signup