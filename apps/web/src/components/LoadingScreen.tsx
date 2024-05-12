import React from "react"

export function LoadingScreen() {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-lg">
            <div className=" bg-gray-700 rounded-lg p-8">
              <div className="flex justify-center items-center p-8">
                 <svg className="animate-spin h-8 w-8 mr-3 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.001 8.001 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zM16 12c0-3.042-1.135-5.824-3-7.938l-3 2.647A7.96 7.96 0 0112 4v8h4zm2 5.291c1.865-2.114 3-4.896 3-7.938h-4v8l1-2.647z"></path>
                 </svg>
               <span className="ml-2" >Caricamento...</span>
              </div>
            </div>
        </div>
    )
}