import AuthForm from "./AuthForm";
import { supabase } from "../../utils/supabaseClient";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const handleSignup = async (data: {
    name?: string;
    email: string;
    password: string;
  }) => {
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          full_name: data.name,
        },
      },
    });

    if (error) throw new Error(error.message);

    navigate("/dashboard");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <AuthForm type="signup" onSubmit={handleSignup} />
    </div>
  );
};

export default SignUp;
