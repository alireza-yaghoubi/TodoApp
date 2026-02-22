import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";

function SigninPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const { status } = useSession();

  useEffect(()=>{
    if(status==="authenticated") router.replace('/')
  },[status])

  const LoginHandler = async () => {
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (!res.error) router.push("/");
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

export default SigninPage;
