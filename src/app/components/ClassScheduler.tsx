'use client'

import React, { ClassType, useEffect, useState } from 'react';
import { Calendar, Clock, Plus, Edit2, Trash2, User, MapPin, BookOpen } from 'lucide-react';
import ClassModal from './ClassModal';

interface ClassItem {
  id: number;
  name: string;
  instructor: string;
  room: string;
  day: string;
  startTime: string;
  endTime: string;
  color: string;
}

const ClassScheduler = () => {
  const [classes, setClasses] = useState<ClassItem[]>([
    {
      id: 1,
      name: 'AI',
      instructor: 'Sarah Johnson',
      room: 'Room 101',
      day: 'Monday',
      startTime: '09:00',
      endTime: '11:00',
      color: 'bg-blue-500'
    },
    {
      id: 2,
      name: 'Database Design',
      instructor: 'Mike Chen',
      room: 'Lab 105',
      day: 'Wednesday',
      startTime: '14:00',
      endTime: '16:00',
      color: 'bg-green-500'
    },
    {
      id: 3,
      name: 'UI/UX Principles',
      instructor: 'Emily Davis',
      room: 'Studio A',
      day: 'Friday',
      startTime: '10:30',
      endTime: '12:30',
      color: 'bg-purple-500'
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingClass, setEditingClass] = useState<ClassItem | null>(null);
  const [currentView, setCurrentView] = useState('week');

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const colors = [
    'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-red-500', 
    'bg-yellow-500', 'bg-indigo-500', 'bg-pink-500', 'bg-teal-500'
  ];

  const timeSlots = Array.from({ length: 13 }, (_, i) => {
    const hour = i + 8;
    return `${hour.toString().padStart(2, '0')}:00`;
  });

  const handleAddClass = () => {
    setEditingClass({
      id: 0,
      name: '',
      instructor: '',
      room: '',
      day: 'Monday',
      startTime: '09:00',
      endTime: '10:00',
      color: colors[Math.floor(Math.random() * colors.length)]
    });
    setShowModal(true);
  };

  const handleEditClass = (classItem: ClassItem) => {
    setEditingClass(classItem);
    setShowModal(true);
  };

  const handleDeleteClass = (id: number) => {
    setClasses(classes.filter(c => c.id !== id));
  };

  const handleSaveClass = (classData: ClassItem) => {
    if (classData.id && classData.id > 0) {
      setClasses(classes.map(c => c.id === classData.id ? classData : c));
    } else {
      const newClass = {
        ...classData,
        id: Math.max(...classes.map(c => c.id), 0) + 1
      };
      setClasses([...classes, newClass]);
    }
    setShowModal(false);
    setEditingClass(null);
  };

  const getClassesForDay = (day: string) => {
    return classes.filter(c => c.day === day).sort((a, b) => a.startTime.localeCompare(b.startTime));
  };

  const getTimePosition = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    const totalMinutes = (hours - 8) * 60 + minutes;
    return (totalMinutes / 60) * 80; // 80px per hour
  };

  const getClassDuration = (startTime: string, endTime: string) => {
    const [startHours, startMinutes] = startTime.split(':').map(Number);
    const [endHours, endMinutes] = endTime.split(':').map(Number);
    const startTotal = startHours * 60 + startMinutes;
    const endTotal = endHours * 60 + endMinutes;
    return ((endTotal - startTotal) / 60) * 80; // 80px per hour
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 border border-slate-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-xl">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Class Scheduler</h1>
                <p className="text-gray-600 mt-1">Manage your class schedule efficiently</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setCurrentView('week')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    currentView === 'week' 
                      ? 'bg-white text-gray-900 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Week View
                </button>
                <button
                  onClick={() => setCurrentView('list')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    currentView === 'list' 
                      ? 'bg-white text-gray-900 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  List View
                </button>
              </div>
              <button
                onClick={handleAddClass}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl"
              >
                <Plus className="w-5 h-5" />
                <span className="font-medium">Add Class</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        {currentView === 'week' ? (
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="grid grid-cols-6 bg-gray-50 border-b border-gray-200">
              <div className="p-4 border-r border-gray-200">
                <Clock className="w-5 h-5 text-gray-500" />
              </div>
              {days.map(day => (
                <div key={day} className="p-4 text-center font-semibold text-gray-900 border-r border-gray-200 last:border-r-0">
                  {day}
                </div>
              ))}
            </div>
            
            <div className="relative">
              <div className="grid grid-cols-6">
                {/* Time column */}
                <div className="border-r border-gray-200">
                  {timeSlots.map((time) => (
                    <div key={time} className="h-20 border-b border-gray-100 p-2 text-sm text-gray-500 flex items-start">
                      {time}
                    </div>
                  ))}
                </div>
                
                {/* Day columns */}
                {days.map(day => (
                  <div key={day} className="border-r border-gray-200 last:border-r-0 relative">
                    {timeSlots.map((time) => (
                      <div key={time} className="h-20 border-b border-gray-100"></div>
                    ))}
                    
                    {/* Classes for this day */}
                    {getClassesForDay(day).map(classItem => (
                      <div
                        key={classItem.id}
                        className={`absolute left-1 right-1 ${classItem.color} text-white rounded-lg p-2 shadow-md hover:shadow-lg transition-all cursor-pointer group`}
                        style={{
                          top: `${getTimePosition(classItem.startTime)}px`,
                          height: `${getClassDuration(classItem.startTime, classItem.endTime)}px`
                        }}
                        onClick={() => handleEditClass(classItem)}
                      >
                        <div className="text-sm font-semibold truncate">{classItem.name}</div>
                        <div className="text-xs opacity-90 truncate">{classItem.instructor}</div>
                        <div className="text-xs opacity-90 truncate">{classItem.room}</div>
                        <div className="text-xs opacity-90">{classItem.startTime} - {classItem.endTime}</div>
                        
                        <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteClass(classItem.id);
                            }}
                            className="text-white hover:text-red-200 p-1"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">All Classes</h2>
              <div className="space-y-4">
                {classes.map(classItem => (
                  <div key={classItem.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-4 h-16 ${classItem.color} rounded-full`}></div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{classItem.name}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                            <div className="flex items-center space-x-1">
                              <User className="w-4 h-4" />
                              <span>{classItem.instructor}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-4 h-4" />
                              <span>{classItem.room}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>{classItem.day}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>{classItem.startTime} - {classItem.endTime}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleEditClass(classItem)}
                          className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteClass(classItem.id)}
                          className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Modal */}
        {showModal && editingClass && (
          <ClassModal
            classData={editingClass}
            colors={colors}
            onSave={handleSaveClass}
            onClose={() => {
              setShowModal(false);
              setEditingClass(null);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ClassScheduler;

