import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import Page from "../../../components/page"
import {
  Button,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Popover,
  makeStyles
} from "@material-ui/core"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined"
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline"
import SearchIcon from '@material-ui/icons/Search'
import useAuth from "../../../hooks/useAuth"
import IngredientForm from "./ingredientForm"
import { ingredientRef } from "../../../store/query"
import IngredientsLst from "./ingredientsLst"

const useStyles = makeStyles((theme) => ({
  header: {
    padding: "10px"
  },
  addInsBtn: {
    backgroundColor: "#1167b1",
    color: "white",
    "&:hover": {
      backgroundColor: "#03254c"
    }
  },
  searchField: {
    marginLeft: "40px"
  },
  input: {
    width: "80%"
  },
  userContainer: {
    padding: "10px",
    // width: "150px"
  }
}))
const IngredientsListView = (props) => {
  const classes = useStyles()
  const { user } = useSelector(state => state.user)
  const history = useHistory()
  useEffect(() => {
    if (!user || user.role !== "admin") {
      history.push("/404")
    }
  }, [])
  const [ingredientsLst, setIngredientsLst] = useState([])
  const [searchedInsLst, setSearchedInsLst] = useState([])

  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const { logout } = useAuth()
  const [openForm, setOpenForm] = useState(false)

  useEffect(() => {
    ingredientRef.get().then(querySnapshot => {
      const docLst = []
      querySnapshot.forEach((doc) => {
        docLst.push(doc.data())
      })
      docLst.sort((a, b) => a.order - b.order)
      setIngredientsLst(docLst)
      setSearchedInsLst(docLst)
    })
  }, [])
  const handleSearch = (e) => {
    const searchStr = e.target.value
    const searchedLst = ingredientsLst.filter(ins => ins.name.toLowerCase().includes(searchStr.toLowerCase()))
    setSearchedInsLst(searchedLst)
  }
  return (
    <Page
      title="Ingredients"
    >
      <Grid
        container
      >
        <Grid
          item
          xs={12}
          style={{ background: "#d0efff" }}
          className={classes.header}
        >
          <Grid container alignItems="center">
            <Grid item xs={7}>
              <Grid item xs={6} className={classes.searchField}>
                <Paper>
                  <IconButton >
                    <SearchIcon />
                  </IconButton>
                  <InputBase
                    className={classes.input}
                    placeholder="Search ingredient..."
                    onChange={handleSearch}
                  />
                </Paper>
              </Grid>
            </Grid>
            <Grid item xs={4} >
              <Button
                variant="contained"
                className={classes.addInsBtn}
                startIcon={<AddCircleOutlineIcon />}
                onClick={() => setOpenForm(true)}
              >
                Add ingredients
              </Button>
              <IngredientForm open={openForm} setOpenForm={setOpenForm} />
            </Grid>
            <Grid item xs={1}>
              <IconButton size="medium" color="primary" onClick={handleClick}>
                <AccountCircleOutlinedIcon style={{ fontSize: 40 }} />
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
                <Paper className={classes.userContainer}>
                  <Button
                    startIcon={<AccountCircleOutlinedIcon />}
                    fullWidth={true}
                    style={{ justifyContent: "flex-start" }}
                  >
                    {user.name}
                  </Button>
                  <Button
                    startIcon={<ExitToAppIcon />}
                    fullWidth={true}
                    style={{ justifyContent: "flex-start" }}
                    onClick={() => logout()}
                  >
                    Log out
                  </Button>
                </Paper>

              </Popover>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
        >
          <IngredientsLst searchedInsLst={searchedInsLst} />
        </Grid>
      </Grid>
    </Page>
  )
}
export default IngredientsListView