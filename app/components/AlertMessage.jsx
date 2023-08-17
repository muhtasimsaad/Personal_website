import React from "react";
import "@fortawesome/fontawesome-free/css/all.css";

function AlertMessage({ type }) {

  return (
    <div class={`rounded-md p-3 mb-8 flex ${type == 'green' ? 'bg-green-100' : 'bg-red-200'}  `}>
      <div className="flex mx-auto">
        { type =="green" && <svg
            class="stroke-2 stroke-current text-green-600 h-8 w-8 mr-2 flex-shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
          
          <path d="M0 0h24v24H0z" stroke="none" />
          <circle cx="12" cy="12" r="9" />
          <path d="M9 12l2 2 4-4" />
        </svg>}

        { type =="red" && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class=" mr-2 text-red-500 w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        }

        <div className={`h-fit my-auto ${type == 'green' ? 'text-green-700' : 'text-red-500'}`}>
          { type == "green" && <div>Thank you for reaching out to me. We shall be in touch shortly.</div>}
          { type == "red" && <div>There was an error. Please try again</div>}
        </div>
    </div>
      
</div>
  );
}

export default AlertMessage;