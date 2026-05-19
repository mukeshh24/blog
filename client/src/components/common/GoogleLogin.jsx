import { signInWithPopup } from "firebase/auth";
import { Button } from "../ui/button";
import googleLogo from "@/assets/google-logo.png";
import { auth, googleProvider } from "@/firebase/firebase.config";
import { useNavigate } from "react-router-dom";
import { userGoogleLogin } from "@/services/authServices";
import { IndexRoute } from "@/routes/Route";
import { toast } from "sonner";
import errorHandler from "@/lib/errorHandler";
import { useDispatch } from "react-redux";
import { setAuth } from "@/store/features/auth/authSlice";

const GoogleLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const firebaseData = await signInWithPopup(auth, googleProvider);

      const payload = {
        name: firebaseData?.user?.displayName,
        email: firebaseData?.user?.email,
        avatar: firebaseData?.user?.photoURL,
      };

      const response = await userGoogleLogin(payload);

      if (response?.success) {
        dispatch(setAuth(response.user));
        toast.success(response.message);
        navigate(IndexRoute);
      }
    } catch (error) {
      const message = error?.response?.data?.message || "Something went wrong!";
      toast.error(message);
      console.log(errorHandler(error));
    }
  };

  return (
    <Button
      onClick={handleLogin}
      className="flex items-center gap-2 w-full rounded-lg h-11 text-base font-medium bg-muted text-black cursor-pointer hover:bg-[#DDDDDD]/40 transition-all duration-300"
    >
      <img src={googleLogo} className="w-5.5 h-5.5" alt="google logo" />
      <span>Continue With Google</span>
    </Button>
  );
};

export default GoogleLogin;
