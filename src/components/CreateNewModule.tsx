import React, { useState } from 'react'

function CreateNewModule() {
  const [isOpen, setIsOpen] = useState(false)



  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>Add a Module</button>
      {isOpen && (
        <form>
          <label>Select an Instrument</label>
          <select>
            <option value={'bass drum'}>bass drum</option>
            <option value={'snare drum'}>snare drum</option>
            <option value={'cymbal'}>cymbal</option>
            <option value={'tom'}>tom</option>
          </select>
          <button>Create Module</button>
        </form>
      )}
    </div>
  )
}

export default CreateNewModule