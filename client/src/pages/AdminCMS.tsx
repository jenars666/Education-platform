import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileUp, Save, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function AdminCMS() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("hero");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    imageUrl: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Check if user is admin
  if (user?.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 max-w-md">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
          <p className="text-gray-600">You do not have permission to access the admin panel.</p>
        </Card>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // TODO: Implement API call to save content
      toast.success("Content saved successfully!");
      setFormData({ title: "", description: "", content: "", imageUrl: "" });
      setImageFile(null);
    } catch (error) {
      toast.error("Failed to save content");
    } finally {
      setIsLoading(false);
    }
  };

  const contentTypes = [
    { id: "hero", label: "Hero Section" },
    { id: "about", label: "About Section" },
    { id: "faq", label: "FAQs" },
    { id: "testimonial", label: "Testimonials" },
    { id: "batch", label: "Batch Information" },
    { id: "curriculum", label: "Curriculum" },
    { id: "instructor", label: "Instructors" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin CMS</h1>
          <p className="text-gray-600">Manage website content, images, and information</p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card className="p-4 sticky top-6">
              <h3 className="font-semibold text-gray-900 mb-4">Content Types</h3>
              <div className="space-y-2">
                {contentTypes.map(type => (
                  <button
                    key={type.id}
                    onClick={() => setActiveTab(type.id)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      activeTab === type.id
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </Card>
          </div>

          {/* Main Editor */}
          <div className="lg:col-span-3">
            <Card className="p-6">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-3 w-full mb-6">
                  <TabsTrigger value="edit">Edit</TabsTrigger>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                </TabsList>

                {/* Edit Tab */}
                <TabsContent value="edit" className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                    <Input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Enter content title"
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <Textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Enter content description"
                      rows={3}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                    <Textarea
                      name="content"
                      value={formData.content}
                      onChange={handleInputChange}
                      placeholder="Enter main content (supports markdown)"
                      rows={6}
                      className="w-full font-mono text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
                      <FileUp className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                        id="image-upload"
                      />
                      <label htmlFor="image-upload" className="cursor-pointer">
                        <span className="text-blue-600 hover:text-blue-700">Click to upload</span>
                        {imageFile && <p className="text-sm text-gray-600 mt-2">{imageFile.name}</p>}
                      </label>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button
                      onClick={handleSave}
                      disabled={isLoading}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      {isLoading ? "Saving..." : "Save as Draft"}
                    </Button>
                    <Button
                      onClick={handleSave}
                      disabled={isLoading}
                      variant="outline"
                    >
                      Publish
                    </Button>
                  </div>
                </TabsContent>

                {/* Preview Tab */}
                <TabsContent value="preview" className="space-y-4">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h2 className="text-2xl font-bold mb-2">{formData.title || "Title Preview"}</h2>
                    <p className="text-gray-600 mb-4">{formData.description || "Description preview"}</p>
                    {formData.imageUrl && (
                      <img src={formData.imageUrl} alt="Preview" className="max-h-96 rounded-lg mb-4" />
                    )}
                    <div className="prose max-w-none">{formData.content || "Content preview"}</div>
                  </div>
                </TabsContent>

                {/* History Tab */}
                <TabsContent value="history">
                  <div className="text-center py-8 text-gray-500">
                    <p>Version history will be displayed here</p>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
