import React from "react"
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@material-ui/core"
import LineItem from "./lineItem"

const IngredientsLst = ({ searchedInsLst, ...rest }) => {
  return (
    <Table>
      <TableHead style={{ background: "#d0efff" }}>
        <TableRow>
          <TableCell></TableCell>
          <TableCell>No.</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Description</TableCell>
          <TableCell>Role</TableCell>
          <TableCell>Toxicity level</TableCell>
          <TableCell>ADI</TableCell>
          <TableCell>Usually found in</TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {searchedInsLst.map((ingredient, index) => (
          <LineItem ingredient={ingredient} key={index} index={index} />
        ))}
      </TableBody>
    </Table>
  )
}
export default IngredientsLst