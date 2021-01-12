import React, { useEffect, useState, useMemo } from 'react';
import { updateModule } from '../api/module'

// @ts-ignore
export const Module = ({ moduleId, loopId }) => {
  const defaultModuleParams = {
    beat_1_1: true,
    beat_1_2: false,
    beat_1_3: false,
    beat_1_4: false,
    beat_2_1: false,
    beat_2_2: false,
    beat_2_3: false,
    beat_2_4: false,
    beat_3_1: false,
    beat_3_2: false,
    beat_3_3: false,
    beat_3_4: false,
    beat_4_1: false,
    beat_4_2: false,
    beat_4_3: false,
    beat_4_4: false,
    effects: "{}",
    id: moduleId,
    instrument: '',
    loopId,
    name: '',
    volume: 50,
  }

  const [module, setModule] = useState(defaultModuleParams)
  
  useEffect(() => {
    update()
  }, [])

  const update = async () => {
    // @ts-ignore
    const module = await updateModule({id: moduleId})
    console.log({ module })
    // @ts-ignore
    module && setModule(module)
  }

  const handleChange = async () => {
    
  }
  return (
    <div>
      Module Container
    </div>
  )
}