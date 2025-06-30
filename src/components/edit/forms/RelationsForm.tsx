import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, User, Building2, Search, X, Edit, Check } from "lucide-react";
import type { Novel } from "../../../types/novel";
import FormField from "../FormField";
import CreateEntityModal from "../modals/CreateEntityModal";

type NovelEditForm = Omit<Novel, "id" | "statistics">;

interface Creator {
  id?: string;
  name: string;
  originalName?: string;
  role: "Author" | "Artist" | "Illustrator";
}

interface Publisher {
  id?: string;
  name: string;
  type: "Original" | "Licensed";
  website?: string;
}

export default function RelationsForm() {
  const { register, watch, setValue } = useFormContext<NovelEditForm>();
  const creators = watch("creators") || [];
  const publishers = watch("publishers") || [];

  const [showCreateCreator, setShowCreateCreator] = useState(false);
  const [showCreatePublisher, setShowCreatePublisher] = useState(false);
  const [selectedCreator, setSelectedCreator] = useState("");
  const [selectedPublisher, setSelectedPublisher] = useState("");

  // Mock data for existing entities
  const existingCreators = [
    { id: "1", name: "TurtleMe", role: "Author" },
    { id: "2", name: "Fuyuki23", role: "Artist" },
    { id: "3", name: "J.K. Rowling", role: "Author" },
    { id: "4", name: "Hajime Isayama", role: "Author" },
    { id: "5", name: "ONE", role: "Author" },
  ];

  const existingPublishers = [
    { id: "1", name: "Tapas Media", type: "Original" },
    { id: "2", name: "Yen Press", type: "Licensed" },
    { id: "3", name: "Kakaopage", type: "Original" },
    { id: "4", name: "Webtoon", type: "Original" },
    { id: "5", name: "Seven Seas Entertainment", type: "Licensed" },
  ];

  const addCreatorFromExisting = () => {
    if (!selectedCreator) return;

    const existing = existingCreators.find((c) => c.id === selectedCreator);
    if (existing) {
      const newCreator = {
        name: existing.name,
        role: existing.role as Creator["role"],
      };
      setValue("creators", [...creators, newCreator]);
      setSelectedCreator("");
    }
  };

  const addPublisherFromExisting = () => {
    if (!selectedPublisher) return;

    const existing = existingPublishers.find((p) => p.id === selectedPublisher);
    if (existing) {
      const newPublisher = {
        name: existing.name,
        type: existing.type as Publisher["type"],
      };
      setValue("publishers", [...publishers, newPublisher]);
      setSelectedPublisher("");
    }
  };

  const removeCreator = (index: number) => {
    setValue(
      "creators",
      creators.filter((_, i) => i !== index)
    );
  };

  const removePublisher = (index: number) => {
    setValue(
      "publishers",
      publishers.filter((_, i) => i !== index)
    );
  };

  const updateCreator = (
    index: number,
    field: keyof Creator,
    value: string
  ) => {
    const updatedCreators = [...creators];
    updatedCreators[index] = { ...updatedCreators[index], [field]: value };
    setValue("creators", updatedCreators);
  };

  const updatePublisher = (
    index: number,
    field: keyof Publisher,
    value: string
  ) => {
    const updatedPublishers = [...publishers];
    updatedPublishers[index] = { ...updatedPublishers[index], [field]: value };
    setValue("publishers", updatedPublishers);
  };

  const handleCreateCreator = (creatorData: any) => {
    setValue("creators", [...creators, creatorData]);
    setShowCreateCreator(false);
  };

  const handleCreatePublisher = (publisherData: any) => {
    setValue("publishers", [...publishers, publisherData]);
    setShowCreatePublisher(false);
  };

  return (
    <div className="space-y-8">
      {/* Creators Section */}
      <section className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <User className="text-blue-600" size={20} />
              <div>
                <h3 className="text-lg font-medium text-gray-900">Creators</h3>
                <p className="text-sm text-gray-600">
                  Authors, artists, and illustrators
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <motion.button
                type="button"
                onClick={() => setShowCreateCreator(true)}
                className="flex items-center gap-2 px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Plus size={16} />
                Create New
              </motion.button>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Add Creator Section */}
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <h4 className="font-medium text-gray-900 mb-3">
              Add Existing Creator
            </h4>
            <div className="flex gap-3">
              <select
                value={selectedCreator}
                onChange={(e) => setSelectedCreator(e.target.value)}
                className="flex-1 form-select"
              >
                <option value="">Select a creator...</option>
                {existingCreators
                  .filter(
                    (creator) => !creators.some((c) => c.name === creator.name)
                  )
                  .map((creator) => (
                    <option key={creator.id} value={creator.id}>
                      {creator.name} ({creator.role})
                    </option>
                  ))}
              </select>
              <motion.button
                type="button"
                onClick={addCreatorFromExisting}
                disabled={!selectedCreator}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Plus size={16} />
              </motion.button>
            </div>
          </div>

          {/* Current Creators */}
          <div className="space-y-4">
            <AnimatePresence>
              {creators.map((creator, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="p-4 bg-gray-50 rounded-xl border border-gray-200"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h4 className="font-medium text-gray-900">
                      Creator #{index + 1}
                    </h4>
                    <button
                      type="button"
                      onClick={() => removeCreator(index)}
                      className="p-1 text-gray-400 hover:text-red-500 rounded transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField label="Name" required>
                      <div className="relative">
                        <User
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                          size={20}
                        />
                        <input
                          value={creator.name}
                          onChange={(e) =>
                            updateCreator(index, "name", e.target.value)
                          }
                          className="form-input pl-10"
                          placeholder="Enter creator name"
                        />
                      </div>
                    </FormField>

                    <FormField label="Original Name">
                      <input
                        value={creator.originalName || ""}
                        onChange={(e) =>
                          updateCreator(index, "originalName", e.target.value)
                        }
                        className="form-input font-kr"
                        placeholder="Enter original name"
                      />
                    </FormField>

                    <FormField label="Role" required>
                      <select
                        value={creator.role}
                        onChange={(e) =>
                          updateCreator(index, "role", e.target.value)
                        }
                        className="form-select"
                      >
                        <option value="Author">Author</option>
                        <option value="Artist">Artist</option>
                        <option value="Illustrator">Illustrator</option>
                      </select>
                    </FormField>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {creators.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <User size={32} className="mx-auto mb-3 text-gray-300" />
                <p>No creators added yet</p>
                <p className="text-sm">
                  Select from existing creators or create new ones
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Publishers Section */}
      <section className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-green-50 to-emerald-50 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Building2 className="text-green-600" size={20} />
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Publishers
                </h3>
                <p className="text-sm text-gray-600">
                  Original and licensed publishers
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <motion.button
                type="button"
                onClick={() => setShowCreatePublisher(true)}
                className="flex items-center gap-2 px-3 py-1.5 text-sm text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Plus size={16} />
                Create New
              </motion.button>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Add Publisher Section */}
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <h4 className="font-medium text-gray-900 mb-3">
              Add Existing Publisher
            </h4>
            <div className="flex gap-3">
              <select
                value={selectedPublisher}
                onChange={(e) => setSelectedPublisher(e.target.value)}
                className="flex-1 form-select"
              >
                <option value="">Select a publisher...</option>
                {existingPublishers
                  .filter(
                    (publisher) =>
                      !publishers.some((p) => p.name === publisher.name)
                  )
                  .map((publisher) => (
                    <option key={publisher.id} value={publisher.id}>
                      {publisher.name} ({publisher.type})
                    </option>
                  ))}
              </select>
              <motion.button
                type="button"
                onClick={addPublisherFromExisting}
                disabled={!selectedPublisher}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Plus size={16} />
              </motion.button>
            </div>
          </div>

          {/* Current Publishers */}
          <div className="space-y-4">
            <AnimatePresence>
              {publishers.map((publisher, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="p-4 bg-gray-50 rounded-xl border border-gray-200"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h4 className="font-medium text-gray-900">
                      Publisher #{index + 1}
                    </h4>
                    <button
                      type="button"
                      onClick={() => removePublisher(index)}
                      className="p-1 text-gray-400 hover:text-red-500 rounded transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField label="Name" required>
                      <div className="relative">
                        <Building2
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                          size={20}
                        />
                        <input
                          value={publisher.name}
                          onChange={(e) =>
                            updatePublisher(index, "name", e.target.value)
                          }
                          className="form-input pl-10"
                          placeholder="Enter publisher name"
                        />
                      </div>
                    </FormField>

                    <FormField label="Type" required>
                      <select
                        value={publisher.type}
                        onChange={(e) =>
                          updatePublisher(index, "type", e.target.value)
                        }
                        className="form-select"
                      >
                        <option value="Original">Original Publisher</option>
                        <option value="Licensed">Licensed Publisher</option>
                      </select>
                    </FormField>

                    <FormField label="Website">
                      <input
                        value={publisher.website || ""}
                        onChange={(e) =>
                          updatePublisher(index, "website", e.target.value)
                        }
                        type="url"
                        className="form-input"
                        placeholder="Enter website URL"
                      />
                    </FormField>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {publishers.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Building2 size={32} className="mx-auto mb-3 text-gray-300" />
                <p>No publishers added yet</p>
                <p className="text-sm">
                  Select from existing publishers or create new ones
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Create Modals */}
      <CreateEntityModal
        isOpen={showCreateCreator}
        onClose={() => setShowCreateCreator(false)}
        onSubmit={handleCreateCreator}
        type="creator"
        title="Create New Creator"
      />

      <CreateEntityModal
        isOpen={showCreatePublisher}
        onClose={() => setShowCreatePublisher(false)}
        onSubmit={handleCreatePublisher}
        type="publisher"
        title="Create New Publisher"
      />
    </div>
  );
}
