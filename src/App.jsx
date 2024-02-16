import { useState, useCallback, useEffect, useRef } from 'react'
// import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, SetPassword] = useState('')

  const passwordGenerator = useCallback(()=>{
    let pass = ''
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefijklmnopqrstuvwxyz'
    if(numberAllowed) str += '0123456789'
    if(charAllowed) str += '!@#$%^&*-+_=[]{}~`'

    for(let i=1; i<=length;i++){
      let char = Math.floor(Math.random()*str.length + 1)
      pass += str.charAt(char)
    }
    SetPassword(pass)
  }, [length, numberAllowed, charAllowed, SetPassword])

  // useRef hook
  const passwordRef = useRef(null)

  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select();// these are some methods of browser that gives us value inside input
    passwordRef.current?.setSelctionRange();//, range we can decide, (0,999) range is given in input[min, max]
    window.navigator.clipboard.writeText(password)
  },[password])
  // added useeffect to run thigs softly, as this hook returns the value when password is generated, this will run automatically whenever the page is refreshed.
  useEffect(()=>{
    passwordGenerator()
  },[length, numberAllowed, charAllowed,passwordGenerator])
  // passwordGenerator();
  return (
    <>
      {/* <h1 className='text-4xl text-center text-white'>Password Generator</h1> */}
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-600 bg-gray-600'>
      <h1 className='text-white text-center font-16px text-lg my-3'>Password Generator</h1>
      <div className='flex  rounded-lg overflow-hidden mb-4'>
        <input type="text" 
        value={password} 
        className='outline-none w-full py-1 px-6 text-center  my-5 rounded-md ' 
        placeholder='password' 
        readOnly 
        ref={passwordRef}/>
        <button className='outline-none bg-blue-700 text-white px-1 py-2 shrink-0 mx-0 my-5 rounded-lg'
        onClick={copyPasswordToClipboard}>Copy</button>

      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input 
          type="range"
          min={6}
          max={100}
          value={length}
          className='cursor-pointer'
          onChange={(e)=>{setLength(e.target.value)}} />
          <label htmlFor="">Length: {length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input 
          type="checkbox"
          defaultChecked={numberAllowed}
          id='numberInput'
          onChange={()=>{setNumberAllowed((prev)=> !prev);
          }} />
          <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input 
          type="checkbox"
          defaultChecked={charAllowed}
          id='charInput'
          onChange={()=>{setCharAllowed((prev)=> !prev);
          }} />
          <label htmlFor="charInput">Characters</label>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
