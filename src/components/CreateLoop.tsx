import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { createLoop } from '../api/loop'

function CreateLoop({ history }: any) {
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState('')
  const handleChange = (event: any) => {
    const { value } = event.target
    setName(value)
  } 
  const handleSubmit = async (event: any) => {
    event.preventDefault()
    const newLoop = await createLoop(name)
    console.log({ newLoop })
    newLoop.id && history.push(`/loops/${newLoop.id}`)
  }
  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)} >Create New Loop</button>
      {isOpen && (
        <form onSubmit={handleSubmit}>
          <label>Give your loop a name: </label>
          <input value={name} onChange={handleChange}/>
          <button>Submit</button>
        </form>
      )}
    </div>
  )
}

export default withRouter(CreateLoop)
