"use client"
import { loginRedirect, signupRedirect } from "../actions";
import { NavBar, Card } from "../components"

export default function Home() {
  return (
    <>
      <NavBar />
      <div className=" vh-90 flex flex-col justify-start items-end mt-12 mr-24">
        <div className="flex flex-col p-8">
          <Card
            title="Login"
            descrption="Accedi al tuo account"
            buttonText="Login"
            onClick={loginRedirect} 
          />
          <Card
            title="Signup"
            descrption="Non hai un account? crealo!!"
            buttonText="Signup"
            onClick={signupRedirect} 
          />
        </div>
      </div> 
    </>
  );
}
