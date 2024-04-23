"use client"
import { candidaturaHandle, loginHandle } from "../actions";
import { NavBar, Card } from "../components"

export default function Home() {
  return (
    <>
      <NavBar />
      <div className=" vh-90 flex flex-col justify-start items-end mt-32 mr-48">
        <div className="flex flex-col p-8">
          <Card
            title="Login"
            descrption="Accedi al tuo account"
            buttonText="Login"
            onClick={loginHandle} 
          />
          <Card
            title="Candidatura"
            descrption="Vuoi far parte del team? Allora candidati"
            buttonText="Candidati"
            onClick={candidaturaHandle} 
          />
        </div>
      </div> 
    </>
  );
}
