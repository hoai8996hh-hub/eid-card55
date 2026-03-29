import { useState } from 'react';
import { Upload, User } from 'lucide-react';

interface UserFormProps {
  onNameChange: (name: string) => void;
  onImageChange: (imageUrl: string | null) => void;
  userName: string;
}

export default function UserForm({ onNameChange, onImageChange, userName }: UserFormProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        onImageChange(result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-white">
          Your Name
        </label>
        <div className="relative">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={userName}
            onChange={(e) => onNameChange(e.target.value)}
            placeholder="Enter your name..."
            className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all duration-300"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-white">
          Your Photo
        </label>
        <div className="relative">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            id="image-upload"
          />
          <label
            htmlFor="image-upload"
            className="flex items-center justify-center w-full h-40 bg-white/10 backdrop-blur-md border-2 border-dashed border-white/30 rounded-xl cursor-pointer hover:border-blue-500 hover:bg-white/20 transition-all duration-300 group"
          >
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-full object-cover rounded-xl"
              />
            ) : (
              <div className="text-center">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2 group-hover:text-blue-400 transition-colors" />
                <p className="text-white font-medium">Click to upload photo</p>
                <p className="text-gray-400 text-sm mt-1">PNG, JPG up to 10MB</p>
              </div>
            )}
          </label>
        </div>
      </div>
    </div>
  );
}
