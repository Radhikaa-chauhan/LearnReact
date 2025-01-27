import { useCallback, useState, useEffect, useRef } from 'react'


function App() {
const[length, setLength] = useState(8)
const [numberAllowed, setNumberAllowed] = useState(false);
const[characterAllowed, setcharacterAllowed]=useState(false);
const[password, setpassword] = useState(false)

//useRef hook
const passwordRef = useRef(null)

const passwordGenerator = useCallback(()=>{
  let charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
  if (numberAllowed) charset += "0123456789"
  if (characterAllowed) charset += "!@#$%^&*()_+"
  let password = ""
  for (let i = 1; i <=length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length))
  }
setpassword(password)
}, [length, numberAllowed, characterAllowed,setpassword])

useEffect(() =>{
passwordGenerator()

}, [length, numberAllowed, characterAllowed, passwordGenerator])

//Paste password to the clipboard
const copyPasswordToClipboard = useCallback(()=>{
// To give the select effect when the password is copied we use  the password reference

passwordRef.current?.select();

// passwordRef.current?.setSelectionRange(0,3); To select  the specific range of the string or any part

  window.navigator.clipboard.writeText(password)
}, [password])

  return (
    <>
  
 <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-800'>
<h1 className='text-white text-center'>Password Generator</h1>
<div className="flex shadow rounded-lg overflow-hidden mb-4">

<input
type="text" 
value={password}
className="outline-none bg-white w-full py-1 px-3"
placeholder='password'
readOnly
ref={passwordRef}
/>

<button 
onClick={copyPasswordToClipboard}
className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>copy</button>
</div>

<div className='flex text-sm gap-x-2'>
<div className='flex items-center gap-x-1'>
<input type="range" 
min={6}
max={100}
value={length}
className='cursor-pointer'
onChange={(e)=> {setLength(e.target.value)}}
 />
<label> Length: {length}</label>
</div>

  <div className='flex items-center gap-x-1'>
    <input 
    type="checkbox"
    defaultChecked={numberAllowed}
    id="numberInput"
 onChange={() => {
  setNumberAllowed((prev)=> !prev);
 }}
/>
<label htmlFor='numberInput'> Numbers</label>
  </div>



  <div className='flex items-center gap-x-1'>
  <input 
    type="checkbox"
    defaultChecked={characterAllowed}
    id="characterInput"
 onChange={() => {
  setcharacterAllowed((prev)=>!prev);
 }}
/>
<label htmlFor='characterInput'>Characters</label>
  </div>


</div>
</div>
    </>
  )
}

export default App
