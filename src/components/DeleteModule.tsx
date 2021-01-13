import React, { useState } from 'react'
import {
  makeStyles,
  Theme,
} from '@material-ui/core';

declare type Props = {
  handleDelete: () => void,
}

const useStyles = makeStyles((theme: Theme) => ({
  deleteButton: {
    backgroundColor: 'red',
    height: '16px',
    width: '16px',
    textAlign: 'center',
    position: 'relative',
    left: '10px'
  },
  deleteContainer: {
    position: 'relative',
    marginLeft: '-30px',
    left: '30px'
  },

}));

function DeleteModule({ handleDelete }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const handleClick = () => {
    setIsOpen(!isOpen)
  }
  
  const classes = useStyles()
  return (
    <div className={classes.deleteContainer}>
      {isOpen && (
        <div>
          Are you sure you want to delete?

          <button onClick={handleDelete}>Delete</button>
          <button onClick={handleClick}>Cancel</button>
        </div>
      )}
      <div className={classes.deleteButton} onClick={handleClick}>
        X
      </div>
    </div>
  )
}

export default DeleteModule