import AuthForm from "./AuthForm";

const SignUp = () => {
  const handleSignup = async (data: {
    name?: string;
    email: string;
    password: string;
  }) => {
    console.log("Signup data:", data);

    // 🔥 later connect to Supabase here
    // await supabase.auth.signUp(...)
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <AuthForm type="signup" onSubmit={handleSignup} />
    </div>
  );
};

export default SignUp;
