import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

function SigninPage() {
 const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const LoginHandler = async () => {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    if (data.status === "success") {
      router.push("/signin");
    }
    console.log(data);
  };
  return (
    <div className="signin-form">
      <h3>Login Form</h3>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={LoginHandler}>Login</button>
      <div>
        <p>Create an account?</p>
        <Link href="/signup">Sign Up</Link>
      </div>
    </div>
  );

}

export default SigninPage