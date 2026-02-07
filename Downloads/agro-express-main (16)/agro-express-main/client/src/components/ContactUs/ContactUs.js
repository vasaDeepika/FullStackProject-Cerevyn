import React from 'react'

function ContactUs() {
  return (
    <div>
        <div class="flex flex-col items-center justify-center h-screen dark">
  <div class="w-full max-w-md bg-white-100 rounded-lg shadow-md p-6">
    <h2 class="text-2xl font-bold text-red-600 mb-4">Contact Form</h2>

    <form class="flex flex-wrap">
      <input
        type="text"
        class="bg-red-100 text-black border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 w-full md:w-[48%] mr-[2%]"
        placeholder="Full Name"
      />
      <input
        type="email"
        class="bg-red-100 text-black border-0 rounded-md p-2 mb-4 focus:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 w-full md:w-[48%] ml-[2%]"
        placeholder="Email"
      />
      <input
        type="number"
        class="bg-red-100 text-black border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 w-full md:w-[48%] mr-[2%]"
        placeholder="Phone Number"
      />
      <input
        type="text"
        class="bg-red-100 text-black border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 w-full md:w-[48%] ml-[2%]"
        placeholder="Company Name"
      />
      <input
        type="text"
        class="bg-red-100 text-black border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 w-full md:w-[48%] mr-[2%]"
        placeholder="Job Title"
      />
      <input
        type="date"
        class="bg-red-100 text-black border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 w-full md:w-[48%] ml-[2%]"
        placeholder="Date of Birth"
      />
      <textarea
        name="message"
        class="bg-red-100 text-black border-0 rounded-md p-2 mb-auto md:mb-auto md:w-full md:h-auto md:min-h-[100px] md:max-h-[100px] md:flex-grow md:flex-shrink md:flex-auto focus:bg-gray-md:focus:outline-none:focus:ring-blue-md:focus:border-transparent transition ease-in-out duration-fastest"
        placeholder="Message"
      ></textarea>

      <button
        type="submit"
        class=" bg-red-500 to-black-500 text-white font-bold py-2 px-4 rounded-md mt-4 transition ease-in-out duration-150"
      >
        Submit
      </button>
    </form>
  </div>
</div>

    </div>
  )
}

export default ContactUs