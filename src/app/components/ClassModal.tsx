'use client'

import React, { useState } from 'react';
import { User, MapPin, BookOpen, Save, X } from 'lucide-react';

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

interface ClassModalProps {
  classData: ClassItem;
  colors: string[];
  onSave: (classData: ClassItem) => void;
  onClose: () => void;
}

const ClassModal: React.FC<ClassModalProps> = ({ classData, colors, onSave, onClose }) => {
  const [formData, setFormData] = useState(classData);

  const handleSubmit = () => {
    onSave(formData);
  };

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        <div>
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                {formData.id ? 'Edit Class' : 'Add New Class'}
              </h2>
              <button
                type="button"
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Class Name</label>
              <div className="relative">
                <BookOpen className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  required
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Enter class name"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Instructor</label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  required
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.instructor}
                  onChange={(e) => setFormData({...formData, instructor: e.target.value})}
                  placeholder="Enter instructor name"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Room</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  required
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.room}
                  onChange={(e) => setFormData({...formData, room: e.target.value})}
                  placeholder="Enter room number"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Day</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.day}
                onChange={(e) => setFormData({...formData, day: e.target.value})}
              >
                {days.map(day => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
                <input
                  type="time"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.startTime}
                  onChange={(e) => setFormData({...formData, startTime: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">End Time</label>
                <input
                  type="time"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.endTime}
                  onChange={(e) => setFormData({...formData, endTime: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
              <div className="flex flex-wrap gap-2">
                {colors.map(color => (
                  <button
                    key={color}
                    type="button"
                    className={`w-8 h-8 ${color} rounded-full border-2 ${
                      formData.color === color ? 'border-gray-900' : 'border-gray-300'
                    } hover:scale-110 transition-transform`}
                    onClick={() => setFormData({...formData, color})}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="p-6 border-t border-gray-200">
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Class</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassModal;