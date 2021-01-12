import React from 'react';

declare type Props = {
  instrument: string
}
function InstrumentDisplay({ instrument }: Props) {

  return (
    <div>
      Instrument: {instrument}
    </div>
  )
}

export default InstrumentDisplay