import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// material-ui
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// assets
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';

SortableTextInputList.propTypes = {
  handleChange: PropTypes.func,
  value: PropTypes.arrayOf(
    PropTypes.shape({
      precedence: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired
    })
  )
};

function SortableTextInputList({ handleChange: handleListChange, value: listValue, ...other }) {
  const theme = useTheme();
  const [inputText, setInputText] = useState('');
  const [inputList, setInputList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };
  const handleEnterPress = (e) => {
    if (e.key === 'Enter' && inputText.trim() !== '') {
      e.preventDefault();
      if (editIndex !== null) {
        // If in edit mode, handle editing
        handleEditItem(editIndex);
      } else {
        // If not in edit mode, handle adding a new item
        const newOrder = inputList.length + 1; // Incremental order value
        const newItem = { precedence: newOrder, title: inputText };
        setInputList([...inputList, newItem]);
        setInputText('');
        handleListChange([...inputList, newItem]);
      }
    }
  };

  const handleRemoveItem = (index) => {
    const newList = [...inputList];
    newList.splice(index, 1);

    // Update the order of remaining items
    const updatedList = newList.map((item, i) => ({ ...item, precedence: i + 1 }));

    setInputList(updatedList);
    handleListChange(updatedList);
  };

  const handleToggleEdit = (index) => {
    setInputText(inputList[index].title); // Pre-fill the edit field with the existing title
    setEditIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleEditItem = (index) => {
    const newList = [...inputList];
    newList[index].title = inputText;
    setInputList(newList);
    handleListChange(newList);
    setEditIndex(null);
    setInputText('');
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = [...inputList];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Update the order values after reordering
    const updatedList = items.map((item, index) => ({ ...item, precedence: index + 1 }));
    setInputList(updatedList);
    handleListChange(updatedList);
  };
  useEffect(() => {
    if (listValue.length > 0) {
      setInputList(listValue);
    }
  }, [listValue]);

  return (
    <div>
      <TextField
        variant="outlined"
        value={inputText}
        onChange={handleInputChange}
        onKeyPress={handleEnterPress}
        sx={{
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: other.error && theme.palette.error.main
          }
        }}
        {...other}
      />
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="list">
          {(provided) => (
            <List
              {...provided.droppableProps}
              ref={provided.innerRef}
              sx={{
                '& * + *': {
                  mt: 1
                }
              }}
            >
              {inputList.map((item, index) => {
                return (
                  <Draggable key={item.precedence} draggableId={item.precedence.toString()} index={index}>
                    {(provided) => (
                      <ListItem
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        sx={{ bgcolor: 'grey.200', borderRadius: 1, display: 'flex', alignItems: 'center' }}
                      >
                        {editIndex === index ? (
                          <>
                            <TextField
                              fullWidth
                              value={inputText}
                              onChange={handleInputChange}
                              onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                  handleEditItem(index);
                                }
                              }}
                            />
                            <IconButton onClick={() => handleEditItem(index)} color="grey.200" size="small">
                              <SaveOutlinedIcon />
                            </IconButton>
                          </>
                        ) : (
                          <>
                            <ListItemText primary={item.title} />
                            <ListItemIcon>
                              <DragIndicatorOutlinedIcon />
                            </ListItemIcon>
                            <IconButton onClick={() => handleToggleEdit(index)} color="grey.200" size="small">
                              <EditOutlinedIcon />
                            </IconButton>
                            <IconButton onClick={() => handleRemoveItem(index)} color="grey.200" size="small">
                              <CloseOutlinedIcon />
                            </IconButton>
                          </>
                        )}
                      </ListItem>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </List>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default SortableTextInputList;
