import React, { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, GripHorizontal, List, Plus, X } from "lucide-react";
import { toast } from "sonner";

interface CustomList {
  id: string;
  name: string;
  color: string;
}

const defaultLists: CustomList[] = [
  { id: "1", name: "Currently Reading", color: "bg-blue-500" },
  { id: "2", name: "Plan to Read", color: "bg-purple-500" },
  { id: "3", name: "Completed", color: "bg-green-500" },
  { id: "4", name: "On Hold", color: "bg-yellow-500" },
  { id: "5", name: "Dropped", color: "bg-red-500" },
];

export default function ReadingPreferences() {
  const [titleLanguage, setTitleLanguage] = useState("both");
  const [chapterFormat, setChapterFormat] = useState("number");
  const [sortOrder, setSortOrder] = useState("latest");
  const [showProgress, setShowProgress] = useState(true);
  const [customLists, setCustomLists] = useState<CustomList[]>(defaultLists);
  const [newListName, setNewListName] = useState("");

  const handleAddList = () => {
    if (newListName.trim()) {
      const newList = {
        id: Date.now().toString(),
        name: newListName.trim(),
        color: `bg-${
          ["blue", "green", "purple", "pink", "yellow"][
            Math.floor(Math.random() * 5)
          ]
        }-500`,
      };
      setCustomLists([...customLists, newList]);
      setNewListName("");
      toast.success("New list added");
    }
  };

  const handleRemoveList = (id: string) => {
    setCustomLists(customLists.filter((list) => list.id !== id));
    toast.success("List removed");
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold mb-6">Reading Preferences</h2>

        {/* Title Display */}
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4">Title Display</h3>
          <div className="space-y-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="titleLanguage"
                value="english"
                checked={titleLanguage === "english"}
                onChange={(e) => setTitleLanguage(e.target.value)}
                className="text-primary focus:ring-primary"
              />
              <span>English titles only</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="titleLanguage"
                value="native"
                checked={titleLanguage === "native"}
                onChange={(e) => setTitleLanguage(e.target.value)}
                className="text-primary focus:ring-primary"
              />
              <span>Native titles only</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="titleLanguage"
                value="both"
                checked={titleLanguage === "both"}
                onChange={(e) => setTitleLanguage(e.target.value)}
                className="text-primary focus:ring-primary"
              />
              <span>Show both (English • Native)</span>
            </label>
          </div>
        </div>

        {/* Chapter Numbering */}
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4">Chapter Numbering</h3>
          <select
            value={chapterFormat}
            onChange={(e) => setChapterFormat(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
          >
            <option value="number">Numbers only (Chapter 123)</option>
            <option value="prefix">With prefix (Ch. 123)</option>
            <option value="full">Full word (Chapter 123)</option>
          </select>
        </div>

        {/* Default Sorting */}
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4">Default Sorting</h3>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
          >
            <option value="latest">Latest Updated</option>
            <option value="title">Title (A-Z)</option>
            <option value="rating">Rating (High to Low)</option>
            <option value="progress">Reading Progress</option>
          </select>
        </div>

        {/* Reading Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Reading Progress</h3>
            <button
              onClick={() => setShowProgress(!showProgress)}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                showProgress ? "bg-green-500" : "bg-gray-200"
              }`}
            >
              <motion.div
                className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full"
                animate={{ x: showProgress ? 24 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </button>
          </div>
          <p className="text-sm text-gray-600">
            Show your reading progress on your profile and in discussions
          </p>
        </div>

        {/* Custom Lists */}
        <div>
          <h3 className="text-lg font-medium mb-4">Custom Lists</h3>
          <div className="space-y-3 mb-4">
            {customLists.map((list) => (
              <motion.div
                key={list.id}
                layout
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg group cursor-grab"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${list.color}`} />
                  <span>{list.name}</span>
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-1 hover:bg-gray-200 rounded">
                    <GripHorizontal
                      size={16}
                      className="text-gray-400 group-hover:text-gray-700 group-hover:scale-110 transition-all"
                    />
                  </button>
                  <button
                    onClick={() => handleRemoveList(list.id)}
                    className="p-1 hover:bg-gray-200 rounded"
                  >
                    <X size={16} className="text-gray-400" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
              placeholder="New list name..."
              className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
            />
            <button
              onClick={handleAddList}
              disabled={!newListName.trim()}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              <Plus size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
