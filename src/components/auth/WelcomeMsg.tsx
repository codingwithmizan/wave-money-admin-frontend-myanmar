import ekyc_logo from "@/assets/logo/app_logo.svg";
import ekyc_title from "@/assets/logo/app_logo_title_colored.svg";
import login_demo from "@/assets/logo/Welcome.svg";


export const WelcomeMsg = () => {
  return (
    <div className="relative bg-login-left h-full">
    <div className="bg-white h-full bg-opacity-60 flex justify-center items-center">
      <div>
        <div className="mb-12 flex flex-col items-center">
          <img src={ekyc_logo} alt="ekyc logo" width={120} />
          <img src={ekyc_title} alt="ekyc title" width={180} />
        </div>
        <h2 className="text-4xl font-semibold text-gray-600 text-center ">
          Welcome Back
        </h2>
        <div className="mt-8">
          <img
            className=" mx-auto h-52"
            src={login_demo}
            alt="app logo title"
          />
        </div>
      </div>
    </div>
  </div>

  )
}
