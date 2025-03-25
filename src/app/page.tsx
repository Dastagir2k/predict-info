'use client'
import { useRouter } from "next/navigation"
import { useState, FormEvent } from "react"

const Page = () => {
  const [inputValue, setInputValue] = useState('')
  const { push } = useRouter()

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    push(`/prediction/${inputValue}`)
    console.log(inputValue)
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-semibold text-center mb-6">Enter Name</h1>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Enter your name..." 
            className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setInputValue(e.target.value)} 
          />
          <button 
            type="submit" 
            className="w-full py-3 bg-red-500 cursor-pointer text-white rounded-md hover:bg-red-600 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default Page
