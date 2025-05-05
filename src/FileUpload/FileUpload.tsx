// "use client";

// import { useRef, useState } from "react";
// import { UploadCloud } from "lucide-react";
// import Image from "next/image";

// interface FileUploadProps {
//   onFileSelect: (file: File) => void;
// }

// const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect }) => {
//   const inputRef = useRef<HTMLInputElement | null>(null);
//   const [previewUrl, setPreviewUrl] = useState<string | null>(null);

//   const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     const file = e.dataTransfer.files?.[0];
//     if (file) {
//       onFileSelect(file);
//       const url = URL.createObjectURL(file);
//       setPreviewUrl(url);
//     }
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       onFileSelect(file);
//       const url = URL.createObjectURL(file);
//       setPreviewUrl(url);
//     }
//   };

//   return (
//     <div
//       className="w-full p-6 border-2 border-dashed border-blue-500 rounded-xl text-center cursor-pointer bg-gray-50 hover:bg-gray-100 transition"
//       onClick={() => inputRef.current?.click()}
//       onDrop={handleDrop}
//       onDragOver={(e) => e.preventDefault()}
//     >
//       {previewUrl ? (
//         <div className="relative mx-auto h-40 w-40 rounded-md overflow-hidden">
//           <Image
//             src={previewUrl}
//             alt="Selected preview"
//             fill
//             className="object-cover"
//           />
//         </div>
//       ) : (
//         <div className="flex flex-col items-center justify-center text-blue-500">
//           <UploadCloud className="w-10 h-10 mb-2" />
//           <p className="font-medium text-sm">
//             Drag & drop or tap to upload image
//           </p>
//         </div>
//       )}

//       <input
//         ref={inputRef}
//         type="file"
//         accept="image/*"
//         className="hidden"
//         onChange={handleChange}
//       />
//     </div>
//   );
// };

// export default FileUpload;

"use client";

import { useEffect, useRef, useState } from "react";
import { UploadCloud } from "lucide-react";
import Image from "next/image";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  clearImage: boolean; // Add clearImage prop to reset image preview
}

const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  clearImage,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      onFileSelect(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  // Reset the preview image when `clearImage` is true
  useEffect(() => {
    if (clearImage) {
      setPreviewUrl(null); // Clear image preview
    }
  }, [clearImage]);

  return (
    <div
      className="w-full p-6 border-2 border-dashed border-blue-500 rounded-xl text-center cursor-pointer bg-gray-50 hover:bg-gray-100 transition"
      onClick={() => inputRef.current?.click()}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      {previewUrl ? (
        <div className="relative mx-auto h-40 w-40 rounded-md overflow-hidden">
          <Image
            src={previewUrl}
            alt="Selected preview"
            fill
            className="object-cover"
          />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-blue-500">
          <UploadCloud className="w-10 h-10 mb-2" />
          <p className="font-medium text-sm">
            Drag & drop or tap to upload image
          </p>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleChange}
      />
    </div>
  );
};

export default FileUpload;
