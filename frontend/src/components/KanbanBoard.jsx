import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import axios from '../axiosinterceptor';

const columnsDefault = {
  'To Do': [], 'In Progress': [], 'Review': [], 'Completed': []
};

const KanbanBoard = ({ project }) => {
  const projectId = project._id;
  const [columns, setColumns] = useState(columnsDefault);
  const [showAdd, setShowAdd] = useState(false);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  const loadTasks = async () => {
    try {
      const res = await axios.get(`/tasks/${projectId}`);
      const data = { ...columnsDefault, ...res.data };
      setColumns(data);
    } catch (err) {
      console.error('loadTasks error', err.response?.data || err.message);
    }
  };

  useEffect(() => {
    loadTasks();
  }, [projectId]);

  const onDragEnd = async (result) => {
    if (!result.destination) return;
    const { source, destination, draggableId } = result;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    const updated = { ...columns };
    const [moved] = updated[source.droppableId].splice(source.index, 1);
    updated[destination.droppableId].splice(destination.index, 0, moved);
    setColumns(updated);

    try {
      await axios.patch(`/tasks/update-status/${draggableId}`, { kanbanStatus: destination.droppableId });
    } catch (err) {
      console.error('update-status error', err.response?.data || err.message);
      loadTasks();
    }
  };

  const addTask = async () => {
    if (!title) return alert('Title required');
    try {
      await axios.post('/tasks/add', {
        projectId,
        title,
        description: desc
        // 🚫 no kanbanStatus, backend enforces "To Do"
      });
      setTitle(''); setDesc(''); setShowAdd(false);
      loadTasks();
    } catch (err) {
      console.error('addTask error', err.response?.data || err.message);
      alert('Failed to add task');
    }
  };

  return (
    <div>
      {/* Only one Add Task button */}
      <div className="mb-4">
        <button className="bg-green-600 text-white px-3 py-1 rounded"
                onClick={() => setShowAdd(true)}>
          + Add Task
        </button>
      </div>

      {showAdd && (
        <div className="mb-4 border p-3 rounded bg-gray-50">
          <div className="mb-2">Add task to <strong>To Do</strong></div>
          <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)}
                 className="border p-1 w-full mb-2" />
          <input placeholder="Description" value={desc} onChange={e => setDesc(e.target.value)}
                 className="border p-1 w-full mb-2" />
          <div className="flex gap-2">
            <button className="bg-blue-600 text-white px-3 py-1 rounded" onClick={addTask}>Add</button>
            <button className="bg-gray-400 text-white px-3 py-1 rounded" onClick={() => setShowAdd(false)}>Cancel</button>
          </div>
        </div>
      )}

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-4 gap-4">
          {Object.keys(columns).map((colName) => (
            <Droppable droppableId={colName} key={colName}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}
                     className="bg-gray-100 p-3 rounded min-h-[200px]">
                  <h3 className="font-semibold mb-2">{colName} ({columns[colName]?.length || 0})</h3>
                  {columns[colName]?.map((task, idx) => (
                    <Draggable key={task._id} draggableId={task._id} index={idx}>
                      {(providedDr) => (
                        <div ref={providedDr.innerRef} {...providedDr.draggableProps} {...providedDr.dragHandleProps}
                             className="bg-white p-2 mb-2 rounded shadow">
                          <div className="font-semibold">{task.title}</div>
                          <div className="text-sm text-gray-600">{task.description}</div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default KanbanBoard;
