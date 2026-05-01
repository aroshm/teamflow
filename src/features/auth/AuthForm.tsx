import { useState } from "react";

type AuthFormProps = {
  type: "login" | "signup";
  onSubmit: (data: {
    name?: string;
    email: string;
    password: string;
  }) => Promise<void>;
};

const AuthForm = ({ type, onSubmit }: AuthFormProps) => {
  const isSignup = type === "signup";

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      await onSubmit(form);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        {isSignup ? "Create Account" : "Welcome Back"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {isSignup && (
          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        )}

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded hover:opacity-90"
        >
          {loading ? "Loading..." : isSignup ? "Sign Up" : "Sign In"}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
