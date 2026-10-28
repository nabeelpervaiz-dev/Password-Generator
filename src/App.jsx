import { useCallback, useEffect, useRef, useState } from 'react'

import './App.css'

function App() {
  const [lenght, setlenght] = useState(8) //as defualt value is 8
  const [NumberAllowed, setNumberAllowed] = useState(false) // numbers allow or not 
  const [CharAllowed, setCharAllowed] = useState(false)// numbers allow or not
  const [password, setpassword] = useState("")
/// ref hook 
const passwordRef=useRef(null)

  /// creating a function that will help use to genertate password 


  // usecallback : help to cache a function defination between re-renders
  // memorization of the code 
 const passwordGenerator= useCallback( 
  ()=>{
  let pass="";
  let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
  if(NumberAllowed){
    str+="0123456789"
  }
  if(CharAllowed){
   str+="!@#$%^&*(){}[]~`"
  }
  for(let i=1;i<=lenght;i++){
    let char= Math.floor(Math.random() * str.length + 1)
    pass+=str.charAt(char)

  }
  setpassword(pass)
 },[lenght,NumberAllowed,CharAllowed , setpassword])



 useEffect(() => {
    
  console.log("firsg render")
  passwordGenerator();
 
 }, [lenght,NumberAllowed,CharAllowed,passwordGenerator])

 /////// to copy the password here we are using useref..
// opyimizing copy passwordc
const copyPassword=useCallback(()=>{
  passwordRef.current?.select()
  passwordRef.current?.setSelectionRange(0,8)
    window.navigator.clipboard.writeText(password)  /// this will copy the complete password from feild
},[password])
  return (
       <div className='w-full h-screen bg-gray-700 border-2 flex justify-center py-20'>
          <div className="box flex flex-col gap-5">
            <h1 className='text-5xl font-bold text-white'>Password Generator</h1>

            <div className="feild flex">
              <input className='w-full py-5 bg-white px-4' 
              ref={passwordRef}
            type="text" 
            placeholder='Password'
            readOnly
              value={password}
            />
            <button
            onClick={copyPassword}
             className='bg-blue-600 font-bold px-5 active:scale-93 cursor-pointer text-white'>Copy</button>
            </div>

            <div className="controls flex flex-col justify-between gap-4 ">
       <div className='flex gap-2 text-orange-400 text-xl font-bold'> 
        <input type='range' 
              min={6}
              max={100}
              value={lenght}
              className='cursor-pointer'
              onChange={(e)=>{
                setlenght(e.target.value)
              }}
              />
              <label htmlFor="">Lenght: {lenght}</label>
       </div>

       <div className='flex gap-2 text-orange-400 text-xl font-bold'>
         <input  type="checkbox"
         defaultChecked={NumberAllowed}
         id='"numberinput'
         onChange={()=>{
          setNumberAllowed((prev)=>!prev)
         }}
         />
         <label htmlFor="">Numbers</label>
         
       </div>
        
        <div className='flex gap-2 text-orange-400 text-xl font-bold'>
            <input type="checkbox"
              defaultChecked={CharAllowed}
         id='"numberinput'
         onChange={()=>{
          setCharAllowed((prev)=>!prev)
         }}
            />
            <label htmlFor="">Characters</label>

        </div>

            </div>
          </div>
       </div>
  )
}

export default App

            