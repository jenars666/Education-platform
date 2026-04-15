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
import AdminLayout from "@/components/AdminLayout";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminCMS() {
  const [activeTab, setActiveTab] = useState("hero");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    imageUrl: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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
    <AdminLayout userName="Admin User" userEmail="admin@educatorspoint.com">
      <motion.div 
        className="max-w-6xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <motion.div 
          className="mb-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">Admin CMS</h1>
          <p className="text-slate-600 text-lg">Manage website content, images, and information</p>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <motion.div 
            className="lg:col-span-1"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="p-4 sticky top-6 backdrop-blur-xl bg-white/70 border border-white/40 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-500">
              <h3 className="font-bold text-slate-800 mb-4 text-lg">Content Types</h3>
              <div className="space-y-2">
                {contentTypes.map(type => (
                  <button
                    key={type.id}
                    onClick={() => setActiveTab(type.id)}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                      activeTab === type.id
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30"
                        : "bg-white/50 text-slate-700 hover:bg-white hover:shadow-md"
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Main Editor */}
          <motion.div 
            className="lg:col-span-3"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="p-6 backdrop-blur-xl bg-white/70 border border-white/40 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-500">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-3 w-full mb-6 backdrop-blur-xl bg-white/60 border border-white/40 p-1.5 rounded-2xl shadow-lg">
                  <TabsTrigger value="edit" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl transition-all duration-200">Edit</TabsTrigger>
                  <TabsTrigger value="preview" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl transition-all duration-200">Preview</TabsTrigger>
                  <TabsTrigger value="history" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl transition-all duration-200">History</TabsTrigger>
                </TabsList>

                <AnimatePresence mode="wait">
                {/* Edit Tab */}
                <TabsContent value="edit" className="space-y-4" asChild>
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Title</label>
                      <Input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        placeholder="Enter content title"
                        className="w-full backdrop-blur-xl bg-white/70 border-white/40 shadow-md rounded-xl"
                      />
                    </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Description</label>
                    <Textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Enter content description"
                      rows={3}
                      className="w-full backdrop-blur-xl bg-white/70 border-white/40 shadow-md rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Content</label>
                    <Textarea
                      name="content"
                      value={formData.content}
                      onChange={handleInputChange}
                      placeholder="Enter main content (supports markdown)"
                      rows={6}
                      className="w-full font-mono text-sm backdrop-blur-xl bg-white/70 border-white/40 shadow-md rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Image</label>
                    <div className="border-2 border-dashed border-blue-300 rounded-2xl p-8 text-center hover:border-blue-500 transition-colors bg-gradient-to-br from-blue-50/50 to-indigo-50/50">
                      <FileUp className="mx-auto h-10 w-10 text-blue-500 mb-3" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                        id="image-upload"
                      />
                      <label htmlFor="image-upload" className="cursor-pointer">
                        <span className="text-blue-600 hover:text-blue-700 font-semibold">Click to upload</span>
                        {imageFile && <p className="text-sm text-slate-600 mt-2 font-medium">{imageFile.name}</p>}
                      </label>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button
                      onClick={handleSave}
                      disabled={isLoading}
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-500/30 rounded-xl"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      {isLoading ? "Saving..." : "Save as Draft"}
                    </Button>
                    <Button
                      onClick={handleSave}
                      disabled={isLoading}
                      variant="outline"
                      className="rounded-xl shadow-md"
                    >
                      Publish
                    </Button>
                  </div>
                  </motion.div>
                </TabsContent>

                {/* Preview Tab */}
                <TabsContent value="preview" className="space-y-4" asChild>
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
                  <div className="bg-gradient-to-br from-slate-50 to-blue-50 p-8 rounded-2xl border border-slate-200 shadow-inner">
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3">{formData.title || "Title Preview"}</h2>
                    <p className="text-slate-600 mb-6 text-lg">{formData.description || "Description preview"}</p>
                    {formData.imageUrl && (
                      <img src={formData.imageUrl} alt="Preview" className="max-h-96 rounded-2xl mb-6 shadow-xl" />
                    )}
                    <div className="prose max-w-none text-slate-700">{formData.content || "Content preview"}</div>
                  </div>
                  </motion.div>
                </TabsContent>

                {/* History Tab */}
                <TabsContent value="history" asChild>
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
                  <div className="text-center py-12 text-slate-500">
                    <p className="text-lg">Version history will be displayed here</p>
                  </div>
                  </motion.div>
                </TabsContent>
                </AnimatePresence>
              </Tabs>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </AdminLayout>
  );
}
