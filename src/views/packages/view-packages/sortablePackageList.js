import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// material-ui
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// project imports
import PackageItem from './packageItem';

SortablePackageList.propTypes = {
  packageList: PropTypes.array,
  handleListChange: PropTypes.func,
  widths: PropTypes.object,
  actions: PropTypes.object
};

function SortablePackageList({ packageList, handleListChange, widths, actions }) {
  const [inputList, setInputList] = useState([]);

  useEffect(() => {
    setInputList(packageList);
  }, [packageList]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = [...inputList];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Update the order values after reordering
    const updatedList = items.map((item, index) => ({ ...item, precedence: index + 1 }));

    if (handleListChange) {
      handleListChange(updatedList);
    }

    setInputList(updatedList);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="list">
        {(provided) => (
          <List {...provided.droppableProps} ref={provided.innerRef}>
            {inputList &&
              inputList.map((item, index) => (
                <Draggable key={item._id} draggableId={item._id} index={index}>
                  {(provided) => (
                    <ListItem
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      sx={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #e0e0e0', py: 0 }}
                    >
                      <PackageItem Package={item} widths={widths} actions={actions} />
                    </ListItem>
                  )}
                </Draggable>
              ))}
            {provided.placeholder}
          </List>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default SortablePackageList;
