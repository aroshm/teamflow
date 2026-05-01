import AuthForm from "./AuthForm";
import { supabase } from "../../utils/supabaseClient";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();

  const handleLogin = async (data: { email: string; password: string }) => {
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) throw new Error(error.message);

    navigate("/dashboard");
  };
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <AuthForm type="login" onSubmit={handleLogin} />
    </div>
  );
};

export default SignIn;
