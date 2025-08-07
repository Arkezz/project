import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  FileText,
  Download,
  CheckCircle,
  XCircle,
  AlertTriangle,
  File,
  Loader2,
  RefreshCw,
  Trash2,
  Send,
  FileSpreadsheet,
  FileJson,
} from "lucide-react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  status: "uploading" | "processing" | "completed" | "error";
  progress: number;
  validChapters: number;
  invalidChapters: number;
  conflicts: number;
}

interface ValidationResult {
  type: "success" | "warning" | "error";
  message: string;
  count: number;
}

const templateFormats = [
  {
    type: "csv",
    name: "CSV Template",
    description: "Comma-separated values format",
    icon: FileText,
    filename: "chapters_template.csv",
  },
  {
    type: "excel",
    name: "Excel Template",
    description: "Microsoft Excel format",
    icon: FileSpreadsheet,
    filename: "chapters_template.xlsx",
  },
  {
    type: "json",
    name: "JSON Template",
    description: "JavaScript Object Notation",
    icon: FileJson,
    filename: "chapters_template.json",
  },
];

export default function BulkUploadTab() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [validationResults, setValidationResults] = useState<
    ValidationResult[]
  >([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const uploadedFile: UploadedFile = {
        id: Date.now().toString() + Math.random(),
        name: file.name,
        size: file.size,
        type: file.type,
        status: "uploading",
        progress: 0,
        validChapters: 0,
        invalidChapters: 0,
        conflicts: 0,
      };

      setUploadedFiles((prev) => [...prev, uploadedFile]);

      // Simulate file upload and processing
      simulateFileProcessing(uploadedFile.id);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/csv": [".csv"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
      "application/json": [".json"],
      "text/plain": [".txt"],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
  });

  const simulateFileProcessing = async (fileId: string) => {
    // Upload phase
    for (let i = 0; i <= 100; i += 10) {
      await new Promise((resolve) => setTimeout(resolve, 100));
      setUploadedFiles((prev) =>
        prev.map((file) =>
          file.id === fileId ? { ...file, progress: i } : file
        )
      );
    }

    // Processing phase
    setUploadedFiles((prev) =>
      prev.map((file) =>
        file.id === fileId
          ? { ...file, status: "processing", progress: 0 }
          : file
      )
    );

    for (let i = 0; i <= 100; i += 5) {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setUploadedFiles((prev) =>
        prev.map((file) =>
          file.id === fileId ? { ...file, progress: i } : file
        )
      );
    }

    // Completion with random results
    const validChapters = Math.floor(Math.random() * 50) + 10;
    const invalidChapters = Math.floor(Math.random() * 5);
    const conflicts = Math.floor(Math.random() * 3);

    setUploadedFiles((prev) =>
      prev.map((file) =>
        file.id === fileId
          ? {
              ...file,
              status: "completed",
              progress: 100,
              validChapters,
              invalidChapters,
              conflicts,
            }
          : file
      )
    );

    // Add validation results
    const results: ValidationResult[] = [
      {
        type: "success",
        message: "Valid chapters found",
        count: validChapters,
      },
    ];

    if (invalidChapters > 0) {
      results.push({
        type: "error",
        message: "Invalid entries detected",
        count: invalidChapters,
      });
    }

    if (conflicts > 0) {
      results.push({
        type: "warning",
        message: "Duplicate chapters found",
        count: conflicts,
      });
    }

    setValidationResults(results);
    toast.success(`File processed: ${validChapters} valid chapters found`);
  };

  const downloadTemplate = (format: string) => {
    const templates = {
      csv: `Chapter Number,Title,URL,Language,Translation Type
1,"Chapter 1: The Beginning","https://example.com/chapter-1","en","official"
2,"Chapter 2: First Steps","https://example.com/chapter-2","en","official"`,
      json: JSON.stringify(
        {
          chapters: [
            {
              number: 1,
              title: "Chapter 1: The Beginning",
              url: "https://example.com/chapter-1",
              language: "en",
              translationType: "official",
            },
            {
              number: 2,
              title: "Chapter 2: First Steps",
              url: "https://example.com/chapter-2",
              language: "en",
              translationType: "official",
            },
          ],
        },
        null,
        2
      ),
      excel: "Excel template would be generated server-side",
    };

    const template = templates[format as keyof typeof templates];
    const blob = new Blob([template], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download =
      templateFormats.find((t) => t.type === format)?.filename ||
      "template.txt";
    a.click();
    URL.revokeObjectURL(url);

    toast.success(`${format.toUpperCase()} template downloaded`);
  };

  const removeFile = (fileId: string) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== fileId));
    toast.success("File removed");
  };

  const retryProcessing = (fileId: string) => {
    setUploadedFiles((prev) =>
      prev.map((file) =>
        file.id === fileId
          ? { ...file, status: "uploading", progress: 0 }
          : file
      )
    );
    simulateFileProcessing(fileId);
  };

  const processAllFiles = () => {
    const completedFiles = uploadedFiles.filter(
      (f) => f.status === "completed"
    );
    const totalValid = completedFiles.reduce(
      (sum, file) => sum + file.validChapters,
      0
    );

    if (totalValid === 0) {
      toast.error("No valid chapters to process");
      return;
    }

    toast.success(
      `Successfully processed ${totalValid} chapters from ${completedFiles.length} files`
    );
    setUploadedFiles([]);
    setValidationResults([]);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "uploading":
      case "processing":
        return <Loader2 size={16} className="text-blue-500 animate-spin" />;
      case "completed":
        return <CheckCircle size={16} className="text-green-500" />;
      case "error":
        return <XCircle size={16} className="text-red-500" />;
      default:
        return <File size={16} className="text-gray-400" />;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="space-y-8" role="tabpanel" id="panel-bulk-upload">
      {/* Template Download Section */}
      <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
        <div className="flex items-center gap-3 mb-4">
          <Download className="text-blue-600" size={20} />
          <div>
            <h4 className="font-semibold text-gray-900">Download Templates</h4>
            <p className="text-sm text-gray-600">
              Get started with pre-formatted templates for your chapter data
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {templateFormats.map((template) => {
            const Icon = template.icon;
            return (
              <motion.button
                key={template.type}
                onClick={() => downloadTemplate(template.type)}
                className="flex items-center gap-3 p-4 bg-white rounded-lg border border-blue-200 hover:border-blue-300 hover:shadow-sm transition-all text-left"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon className="text-blue-600" size={24} />
                <div>
                  <div className="font-medium text-gray-900">
                    {template.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {template.description}
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Upload Zone */}
      <div
        {...getRootProps()}
        className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-all cursor-pointer ${
          isDragActive
            ? "border-primary bg-primary/5 scale-105"
            : "border-gray-300 hover:border-primary/50 hover:bg-gray-50"
        }`}
      >
        <input {...getInputProps()} aria-label="Upload chapter files" />

        <motion.div
          animate={{
            y: isDragActive ? -5 : 0,
            scale: isDragActive ? 1.05 : 1,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <Upload
            size={48}
            className={`mx-auto mb-4 ${
              isDragActive ? "text-primary" : "text-gray-400"
            }`}
          />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {isDragActive ? "Drop files here" : "Upload Chapter Files"}
          </h3>
          <p className="text-gray-600 mb-4">
            Drag and drop your files here, or click to browse
          </p>
          <div className="text-sm text-gray-500">
            Supports CSV, Excel, JSON, and TXT files (max 10MB)
          </div>
        </motion.div>
      </div>

      {/* File Processing Area */}
      <AnimatePresence>
        {uploadedFiles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
          >
            <div className="px-6 py-4 bg-gradient-to-r from-green-50 to-emerald-50 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="text-green-600" size={20} />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      File Processing
                    </h4>
                    <p className="text-sm text-gray-600">
                      {uploadedFiles.length} file
                      {uploadedFiles.length !== 1 ? "s" : ""} uploaded
                    </p>
                  </div>
                </div>

                <motion.button
                  type="button"
                  onClick={processAllFiles}
                  disabled={
                    !uploadedFiles.some((f) => f.status === "completed")
                  }
                  className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors font-medium"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Send size={16} />
                  Process All Files
                </motion.button>
              </div>
            </div>

            {/* Files List */}
            <div className="divide-y divide-gray-200">
              {uploadedFiles.map((file, index) => (
                <motion.div
                  key={file.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      {getStatusIcon(file.status)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium text-gray-900 truncate">
                          {file.name}
                        </h5>
                        <div className="flex items-center gap-2">
                          {file.status === "error" && (
                            <button
                              onClick={() => retryProcessing(file.id)}
                              className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                              aria-label="Retry processing"
                            >
                              <RefreshCw size={16} />
                            </button>
                          )}
                          <button
                            onClick={() => removeFile(file.id)}
                            className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                            aria-label="Remove file"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>

                      <div className="text-sm text-gray-600 mb-3">
                        {formatFileSize(file.size)} •{" "}
                        {file.type || "Unknown format"}
                      </div>

                      {/* Progress Bar */}
                      {(file.status === "uploading" ||
                        file.status === "processing") && (
                        <div className="mb-3">
                          <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                            <span>
                              {file.status === "uploading"
                                ? "Uploading..."
                                : "Processing..."}
                            </span>
                            <span>{file.progress}%</span>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-blue-500 rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${file.progress}%` }}
                              transition={{ duration: 0.3 }}
                            />
                          </div>
                        </div>
                      )}

                      {/* Results Summary */}
                      {file.status === "completed" && (
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div className="p-3 bg-green-50 rounded-lg">
                            <div className="text-lg font-semibold text-green-600">
                              {file.validChapters}
                            </div>
                            <div className="text-xs text-green-600">Valid</div>
                          </div>
                          <div className="p-3 bg-red-50 rounded-lg">
                            <div className="text-lg font-semibold text-red-600">
                              {file.invalidChapters}
                            </div>
                            <div className="text-xs text-red-600">Invalid</div>
                          </div>
                          <div className="p-3 bg-amber-50 rounded-lg">
                            <div className="text-lg font-semibold text-amber-600">
                              {file.conflicts}
                            </div>
                            <div className="text-xs text-amber-600">
                              Conflicts
                            </div>
                          </div>
                        </div>
                      )}

                      {file.status === "error" && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                          <div className="flex items-center gap-2 text-red-600">
                            <XCircle size={16} />
                            <span className="text-sm font-medium">
                              Processing failed
                            </span>
                          </div>
                          <p className="text-sm text-red-600 mt-1">
                            Please check file format and try again
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Validation Results */}
      <AnimatePresence>
        {validationResults.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
          >
            <div className="px-6 py-4 bg-gradient-to-r from-purple-50 to-indigo-50 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <AlertTriangle className="text-purple-600" size={20} />
                <div>
                  <h4 className="font-semibold text-gray-900">
                    Validation Results
                  </h4>
                  <p className="text-sm text-gray-600">
                    Review the processing results before finalizing
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-4">
              {validationResults.map((result, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center gap-3 p-4 rounded-lg border ${
                    result.type === "success"
                      ? "bg-green-50 border-green-200"
                      : result.type === "warning"
                        ? "bg-amber-50 border-amber-200"
                        : "bg-red-50 border-red-200"
                  }`}
                >
                  {result.type === "success" && (
                    <CheckCircle size={20} className="text-green-500" />
                  )}
                  {result.type === "warning" && (
                    <AlertTriangle size={20} className="text-amber-500" />
                  )}
                  {result.type === "error" && (
                    <XCircle size={20} className="text-red-500" />
                  )}

                  <div className="flex-1">
                    <div
                      className={`font-medium ${
                        result.type === "success"
                          ? "text-green-700"
                          : result.type === "warning"
                            ? "text-amber-700"
                            : "text-red-700"
                      }`}
                    >
                      {result.message}
                    </div>
                    <div className="text-sm text-gray-600">
                      {result.count} item{result.count !== 1 ? "s" : ""}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Instructions */}
      <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
        <h4 className="font-semibold text-gray-900 mb-4">
          📋 File Format Requirements
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-700">
          <div>
            <h5 className="font-medium mb-2">Required Columns:</h5>
            <ul className="space-y-1">
              <li>• Chapter Number (integer)</li>
              <li>• Chapter Title (text)</li>
              <li>• Chapter URL (valid URL)</li>
              <li>• Language (language code)</li>
              <li>• Translation Type (official/fan/machine)</li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium mb-2">Supported Formats:</h5>
            <ul className="space-y-1">
              <li>• CSV (Comma-separated values)</li>
              <li>• Excel (.xlsx files)</li>
              <li>• JSON (JavaScript Object Notation)</li>
              <li>• TXT (Tab-separated values)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
