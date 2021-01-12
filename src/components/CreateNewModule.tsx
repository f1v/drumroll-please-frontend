import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { createNewModule } from '../api/module'

declare type Props = {
  loopId: number,
  reloadData: () => void,
}

function CreateNewModule({ loopId, reloadData }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedInstrument, setSelectedInstrument] = useState('bass drum')

  const handleChange = (event: any) => {
    const { value } = event.target
    setSelectedInstrument(value)
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault()
    console.log(selectedInstrument)
    const newModule = await createNewModule(selectedInstrument, loopId)
    newModule.loopId && reloadData()
    setIsOpen(false)
  }
  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>Add a Module</button>
      {isOpen && (
        <form onSubmit={handleSubmit}>
          <label>Select an Instrument</label>
          <select onChange={handleChange}>
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