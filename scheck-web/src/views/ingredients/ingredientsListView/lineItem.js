import React, { useState } from "react"
import {
  TableRow,
  TableCell,
  IconButton,
  Popover,
  Button
} from "@material-ui/core"
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import { ingredientRef } from "../../../store/query"
import IngredientForm from "./ingredientForm"

const LineItem = ({ ingredient, index, ...rest }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const handleModify = () => {
    setOpenForm(true)
  }
  const handleDelete = () => {
    ingredientRef.doc(ingredient.id).delete()
      .finally(() => window.location.reload(false))
  }
  const [openForm, setOpenForm] = useState(false)
  let foundIn = "["
  if (ingredient.foundIn) {
    for (let ele of ingredient.foundIn) {
      foundIn += ele + ", "
    }
    foundIn = foundIn.substr(0, foundIn.length - 2)
  }
  foundIn += "]"
  return (
    <TableRow style={index % 2 ? { background: "#d0efff" } : { background: "white" }}>
      <TableCell></TableCell>
      <TableCell >{ingredient.order}</TableCell>
      <TableCell >{ingredient.name}</TableCell>
      <TableCell >{ingredient.description}</TableCell>
      <TableCell>{ingredient.role}</TableCell>
      <TableCell>{ingredient.eNumber}</TableCell>
      <TableCell >{ingredient.toxicityLevel}</TableCell>
      <TableCell>{ingredient.ADI}</TableCell>
      <TableCell>{foundIn}</TableCell>
      <TableCell>
        <IngredientForm open={openForm} setOpenForm={setOpenForm} curIngredient={ingredient} />
        <IconButton
          disableRipple
          onClick={handleClick}
        >
          <MoreHorizIcon />
        </IconButton>
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <Button
            fullWidth
            onClick={handleModify}
          >
            Modify
            </Button>
          <Button
            fullWidth
            onClick={handleDelete}
          >
            Delete
            </Button>
        </Popover>
      </TableCell>
    </TableRow>
  )
}
export default LineItem