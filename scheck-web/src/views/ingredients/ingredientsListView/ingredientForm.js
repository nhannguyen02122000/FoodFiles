import React, { useState } from "react"
import {
  TextField,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  makeStyles
} from "@material-ui/core"
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline"
import { useSnackbar } from 'notistack'
import { ingredientRef, autoNumIngredientRef } from "../../../store/query"
import firebase from "../../../db/firebase"

const useStyles = makeStyles((theme) => ({
  boxOutside: {
    border: "0.5px solid black",
    borderRadius: "10px",
    padding: "10px",
    margin: "10px 0px"
  },
  btnGr: {
    marginTop: "50px"
  }
}))
const AddIngredientForm = ({ open, setOpenForm, curIngredient, ...rest }) => {
  const classes = useStyles()
  const { enqueueSnackbar } = useSnackbar()
  const [ingredient, setIngredient] = useState({
    name: curIngredient ? curIngredient.name : '',
    description: curIngredient ? curIngredient.description : '',
    role: curIngredient ? curIngredient.role : '',
    toxicityLevel: curIngredient ? curIngredient.toxicityLevel : ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const handleChange = (fieldName, value) => {
    setIngredient(ins => ({
      ...ins,
      [fieldName]: value
    }))
  }
  const handleSubmit = async () => {
    if (!ingredient.name) {
      enqueueSnackbar("Name is required", { variant: "warning" })
      return
    }
    if (!ingredient.role) {
      enqueueSnackbar("Role is required", { variant: "warning" })
      return
    }
    if (!ingredient.toxicityLevel) {
      enqueueSnackbar("Toxicity level is required", { variant: "warning" })
      return
    }
    setIsSubmitting(true)
    let insId = (curIngredient && curIngredient.id) || null
    let order = (curIngredient && curIngredient.order) || null
    if (!insId) {
      const insRef = ingredientRef.doc()
      insId = insRef.id
      await autoNumIngredientRef.get().then((doc) => {
        autoNumIngredientRef.update({
          autonumber: firebase.firestore.FieldValue.increment(1),
        })
        order = doc.data().autonumber
      })
    }
    ingredientRef.doc(insId).set({ ...ingredient, id: insId, order: order })
      .then()
      .catch(err => enqueueSnackbar(err, { variant: "warning" }))
      .finally(() => {
        window.location.reload(false)
      })
  }

  return (
    <Dialog onClose={() => setOpenForm(false)} open={open} >
      <DialogTitle>{curIngredient ? "Modify current ingredient" : "Add new ingredient"}</DialogTitle>
      <DialogContent>
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item xs={12} className={classes.boxOutside}>
            <TextField
              fullWidth
              label="Name"
              value={ingredient.name}
              onChange={e => handleChange("name", e.target.value)}
            />
          </Grid>
          <Grid item xs={12} className={classes.boxOutside}>
            <TextField
              multiline
              rows={2}
              fullWidth
              rowsMax={5}
              label="Description"
              value={ingredient.description}
              onChange={e => handleChange("description", e.target.value)}
            />
          </Grid>
          <Grid item xs={12} className={classes.boxOutside}>
            <TextField
              fullWidth
              label="Role"
              value={ingredient.role}
              onChange={e => handleChange("role", e.target.value)}
            />
          </Grid>
          <Grid item xs={12} className={classes.boxOutside}>
            <TextField
              fullWidth
              label="Toxicity level"
              value={ingredient.toxicityLevel}
              onChange={e => handleChange("toxicityLevel", e.target.value)}
            />
            <Grid container justify="space-between" className={classes.btnGr}>
              <Grid item xs={3}>
                <Button
                  style={{ background: "green", color: "white" }}
                  fullWidth
                  onClick={e => handleChange("toxicityLevel", "Safe")}
                >
                  Safe
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button
                  style={{ background: "gold", color: "white" }}
                  fullWidth
                  onClick={e => handleChange("toxicityLevel", "Suspicious")}
                >
                  Suspicious
                  </Button>
              </Grid>
              <Grid item xs={3}>
                <Button
                  style={{ background: "red", color: "white" }}
                  fullWidth
                  onClick={e => handleChange("toxicityLevel", "Dangerous")}
                >
                  Dangerous
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} >
            <Button
              startIcon={<AddCircleOutlineIcon />}
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {curIngredient ? "Save" : "Add"}
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog >
  )
}
export default AddIngredientForm