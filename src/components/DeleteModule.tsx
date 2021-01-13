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
    marginLeft: '-16px',
    left: '16px'
  },
  confirmDelete: {
    position: 'absolute',
    backgroundColor: 'white',
    border: 'black 3px solid',
    zIndex: 10,
  }

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
        <div className={classes.confirmDelete}>
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