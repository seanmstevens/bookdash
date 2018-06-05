import React from 'react'
import PropTypes from 'prop-types'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'

export default (props) => {
  const { books } = props

  return (
    <List>
      {books.map(book => {
        console.log(book)
        return (
          <ListItem>
            <ListItemIcon>
              <Avatar></Avatar>
            </ListItemIcon>
            <ListItemText primary={book.title} secondary={book.author}>
            </ListItemText>
          </ListItem>
        )
      })}
    </List>
  )
}