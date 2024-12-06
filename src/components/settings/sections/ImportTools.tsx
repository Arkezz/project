import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Download,
  Upload,
  FileJson,
  AlertCircle,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";

export default function ImportTools() {
  const [isImporting, setIsImporting] = useState(false);
  const [importProgress, setImportProgress] = useState(0);
  const [isExporting, setIsExporting] = useState(false);

  const handleImport = () => {
    setIsImporting(true);
    setImportProgress(0);

    // Simulate import progress
    const interval = setInterval(() => {
      setImportProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsImporting(false);
          toast.success("Import completed successfully");
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  const handleExport = () => {
    setIsExporting(true);
    // Simulate export
    setTimeout(() => {
      setIsExporting(false);
      toast.success("Data exported successfully");
    }, 2000);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold mb-6">Import & Export</h2>

        {/* NovelUpdates Import */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Download className="text-primary" size={20} />
            <h3 className="font-medium">Import from NovelUpdates</h3>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-4">
            <div className="flex items-start gap-4 mb-6">
              <AlertCircle className="text-primary mt-1" size={20} />
              <div>
                <p className="text-sm text-gray-600 mb-2">
                  This will import your reading list and progress from
                  NovelUpdates. The process might take a few minutes depending
                  on your list size.
                </p>
                <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                  <li>Reading lists and custom lists</li>
                  <li>Reading progress and chapters read</li>
                  <li>Ratings and reviews</li>
                </ul>
              </div>
            </div>

            {isImporting ? (
              <div className="space-y-3">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-primary rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${importProgress}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Importing...</span>
                  <span>{importProgress}%</span>
                </div>
              </div>
            ) : (
              <button
                onClick={handleImport}
                className="w-full px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
              >
                <Download size={20} />
                Start Import
              </button>
            )}
          </div>
        </div>

        {/* Export Data */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Upload className="text-primary" size={20} />
            <h3 className="font-medium">Export Your Data</h3>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <div className="flex items-start gap-4 mb-6">
              <FileJson className="text-primary mt-1" size={20} />
              <div>
                <p className="text-sm text-gray-600 mb-2">
                  Download all your NoviList data in JSON format. This includes:
                </p>
                <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                  <li>Reading lists and progress</li>
                  <li>Custom lists and collections</li>
                  <li>Reviews and ratings</li>
                  <li>Account preferences</li>
                </ul>
              </div>
            </div>

            <button
              onClick={handleExport}
              disabled={isExporting}
              className="w-full px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isExporting ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Preparing Export...
                </>
              ) : (
                <>
                  <Upload size={20} />
                  Export Data
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
