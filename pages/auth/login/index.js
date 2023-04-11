'use Client'
import { useEffect, useState } from "react";
import { auth } from './../../../firebase/firebase';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from 'next/router';

export default function Login() {
    const router = useRouter()
    const [user, setUser] = useAuthState(auth);
    const [signIn, setSignIn] = useState(false)
    const [loginEmail, setLoginEmail] = useState("")
    const [loginPassword, setLoginPassword] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const handleAuthError = (errorMsg) => {
        setError(errorMsg);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!loginEmail || !loginPassword) {
            setError("Please enter email and password.");
            return;
        }
        const user = await signInWithEmailAndPassword(
            auth,
            loginEmail,
            loginPassword
        );
        setLoginEmail("");
        setLoginPassword("");
        router.push('/')
    };

    const register = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError("Please enter email and password.");
            return;
        }
        const result = await createUserWithEmailAndPassword(
            auth,
            email,
            password,
        );
        setEmail("");
        setPassword("");
        router.push('/')
    };

    useEffect(() => {
        console.log(user);
    }, [user]);

   

    return (
        <>
            {signIn ? <div className="flex items-center justify-center px-4 py-12 min-h-[69vh] sm:px-6 lg:px-8">
                <div div className="w-full max-w-md space-y-8" >
                    <div>
                        <img
                            className="w-auto h-12 mx-auto"
                            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                            alt="Your Company"
                        />
                        <h2 className="mt-6 text-3xl font-bold tracking-tight text-center text-gray-900">
                            Sign in to your account
                        </h2>
                    </div>
                    <form onSubmit={onSubmit} className="mt-8 space-y-6" action="#" method="POST">
                        <input type="hidden" name="remember" defaultValue="true" />
                        <div className="-space-y-px rounded-md shadow-sm">
                            <p className="mb-2 font-semibold text-center text-red-500">{error}</p>
                            <div>
                                <label htmlFor="email-address" className="sr-only">
                                    Email address
                                </label>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    onChange={(e) => setLoginEmail(e.target.value)}
                                    required
                                    className="relative px-5 block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    placeholder="Email address"
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    onChange={(e) => setLoginPassword(e.target.value)}
                                    autoComplete="current-password"
                                    required
                                    className="relative block px-5 w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    placeholder="Password"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-center">
                            <div className="text-sm">
                                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                    Forgot your password?
                                </a>
                            </div>
                        </div>

                        <div className="flex flex-col items-center">
                            <button
                                type="submit"
                                className="relative flex justify-center w-full px-3 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md group hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >

                                Sign in
                            </button>
                            <p className="mt-2 text-sm font-semibold text-gray-500">Do not have a account ? <span onClick={() => setSignIn(!signIn)} className="font-bold text-black cursor-pointer">Sign Up</span> </p>
                        </div>
                    </form>
                </div >
            </div > : <div className="flex items-center justify-center px-4 py-12 min-h-[69vh] sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-8">
                    <div>
                        <img
                            className="w-auto h-12 mx-auto"
                            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                            alt="Your Company"
                        />
                        <h2 className="mt-6 text-3xl font-bold tracking-tight text-center text-gray-900">
                            Create your account
                        </h2>

                    </div>
                    <form onSubmit={register} className="mt-8 space-y-6" action="#" method="POST">
                        <input type="hidden" name="remember" defaultValue="true" />
                        <div className="-space-y-px rounded-md shadow-sm">
                            <p>{error}</p>
                            <div>
                                <label htmlFor="email-address" className="sr-only">
                                    Email address
                                </label>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="relative px-5 block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    placeholder="Email address"
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="relative block px-5 w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    placeholder="Password"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col items-center">
                            <button
                                type="submit"
                                className="relative flex justify-center w-full px-3 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md group hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign Up
                            </button>
                            <p className="mt-2 text-sm font-semibold text-gray-500">Already have a account? <span onClick={() => setSignIn(!signIn)} className="font-bold text-black cursor-pointer">Sign In</span> </p>
                        </div>
                    </form>
                    {user && <div>
                        <p>{user.email}</p>
                        <button onClick={logout}>LogOut</button>
                    </div>}
                </div>

            </div>
            }</>
    )
}