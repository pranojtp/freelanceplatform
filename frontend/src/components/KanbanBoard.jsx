
import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import axios from '../axiosinterceptor';

const STATUSES = ['To Do', 'In Progress', 'Awaiting Review', 'Done'];

const emptyColumns = () => {
  const obj = {};
  STATUSES.forEach(s => obj[s] = []);
  return obj;
};

const KanbanBoard = ({ project }) => {
  const projectId = project._id;
  const [columns, setColumns] = useState(emptyColumns());
  const [showAdd, setShowAdd] = useState(false);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [loading, setLoading] = useState(false);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/tasks/${projectId}`);
      const tasks = res.data || [];
      // group by kanbanStatus
      const grouped = emptyColumns();
      tasks.forEach(t => {
        const s = t.kanbanStatus || 'To Do';
        if (!grouped[s]) grouped[s] = []; // in case of unknown status
        grouped[s].push(t);
      });
      setColumns(grouped);
    } catch (err) {
      console.error('loadTasks error', err.response?.data || err.message);
      alert(err.response?.data?.message || 'Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (projectId) {
      setColumns(emptyColumns());
      loadTasks();
    }
  }, [projectId]);

  const onDragEnd = async (result) => {
    if (!result.destination) return;
    const { source, destination, draggableId } = result;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    // create new columns copy and move item
    const newColumns = { ...columns };
    const sourceList = Array.from(newColumns[source.droppableId]);
    const destList = Array.from(newColumns[destination.droppableId]);

    const [moved] = sourceList.splice(source.index, 1);
    destList.splice(destination.index, 0, moved);

    newColumns[source.droppableId] = sourceList;
    newColumns[destination.droppableId] = destList;

    setColumns(newColumns);

    try {
      await axios.patch(`/tasks/update-status/${String(draggableId)}`, { kanbanStatus: destination.droppableId });
    } catch (err) {
      console.error('update-status error', err.response?.data || err.message);
      // revert on failure
      alert(err.response?.data?.message || 'Failed to update task status');
      loadTasks();
    }
  };

  const addTask = async () => {
    if (!title) return alert('Title required');
    try {
      setLoading(true);
      const res = await axios.post('/tasks/add', {
        projectId,
        title,
        description: desc
      });
      // server returns created task in res.data.task
      const created = res.data?.task;
      if (created) {
        // add to To Do in UI instantly
        setColumns(prev => ({ ...prev, ['To Do']: [created, ...prev['To Do']] }));
      } else {
        // fallback: reload from server
        loadTasks();
      }
      setTitle(''); setDesc(''); setShowAdd(false);
    } catch (err) {
      console.error('addTask error', err.response?.data || err.message);
      alert(err.response?.data?.message || 'Failed to add task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-4">
        <button className="bg-green-600 text-white px-3 py-1 rounded" onClick={() => setShowAdd(true)}>+ Add Task</button>
      </div>

      {showAdd && (
        <div className="mb-4 border p-3 rounded bg-gray-50">
          <div className="mb-2">Add task to <strong>To Do</strong></div>
          <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} className="border p-1 w-full mb-2" />
          <input placeholder="Description" value={desc} onChange={e => setDesc(e.target.value)} className="border p-1 w-full mb-2" />
          <div className="flex gap-2">
            <button className="bg-blue-600 text-white px-3 py-1 rounded" onClick={addTask} >Add</button>
            <button className="bg-gray-400 text-white px-3 py-1 rounded" onClick={() => setShowAdd(false)}>Cancel</button>
          </div>
        </div>
      )}

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="h-150 grid grid-cols-4 gap-4">
          {STATUSES.map((colName) => (
            <Droppable droppableId={colName} key={colName}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps} className="bg-gray-100 p-3 rounded min-h-[200px]">
                  <h3 className="font-semibold mb-2">{colName} ({columns[colName]?.length || 0})</h3>
                  {columns[colName]?.map((task, idx) => (
                    <Draggable key={String(task._id)} draggableId={String(task._id)} index={idx}>
                      {(providedDr) => (
                        <div ref={providedDr.innerRef} {...providedDr.draggableProps} {...providedDr.dragHandleProps} className="bg-white p-2 mb-2 rounded shadow">
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
