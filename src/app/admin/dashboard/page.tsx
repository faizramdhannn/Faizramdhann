"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface ProjectData {
  id: number;
  name: string;
  category: string;
  description: string;
  technologies: string;
  image: string;
  link: string;
  status: string;
}

interface ContentData {
  id: number;
  key: string;
  value: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'projects' | 'content'>('projects');
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [content, setContent] = useState<ContentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Partial<ProjectData> | Partial<ContentData>>({});
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    const isAuth = sessionStorage.getItem("adminAuth");
    if (!isAuth) {
      router.push("/login");
      return;
    }
    fetchData();
  }, [router, activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'projects') {
        const response = await fetch("/api/admin/projects");
        if (response.ok) {
          const data = await response.json();
          setProjects(data);
        }
      } else {
        const response = await fetch("/api/admin/content");
        if (response.ok) {
          const data = await response.json();
          setContent(data);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProject = async () => {
    try {
      const response = await fetch("/api/admin/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await fetchData();
        setShowAddForm(false);
        setFormData({});
      }
    } catch (error) {
      console.error("Error adding project:", error);
    }
  };

  const handleUpdateProject = async (id: number) => {
    try {
      const response = await fetch("/api/admin/projects", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, id }),
      });

      if (response.ok) {
        await fetchData();
        setEditingId(null);
        setFormData({});
      }
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  const handleUpdateContent = async (id: number) => {
    try {
      const response = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, id }),
      });

      if (response.ok) {
        await fetchData();
        setEditingId(null);
        setFormData({});
      }
    } catch (error) {
      console.error("Error updating content:", error);
    }
  };

  const handleDeleteProject = async (id: number) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      const response = await fetch(`/api/admin/projects?id=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await fetchData();
      }
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("adminAuth");
    router.push("/");
  };

  const startEdit = (item: ProjectData | ContentData) => {
    setEditingId(item.id);
    setFormData(item);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({});
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="text-2xl text-[#00a67e]">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-200px)] px-6 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-4xl font-bold">
            Admin <span className="text-[#00a67e]">Dashboard</span>
          </h1>
          <button
            onClick={handleLogout}
            className="px-6 py-3 border-2 border-red-500 text-red-500 font-semibold rounded-xl
                     hover:bg-red-500/10 transition-all"
          >
            Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-[#00a67e]/20 pb-4">
          <button
            onClick={() => {
              setActiveTab('projects');
              setShowAddForm(false);
              setEditingId(null);
            }}
            className={`px-6 py-3 font-semibold rounded-t-xl transition-all ${
              activeTab === 'projects'
                ? 'bg-[#00a67e] text-white'
                : 'bg-[#0d1117] text-gray-300 hover:bg-[#161b22]'
            }`}
          >
            Projects
          </button>
          <button
            onClick={() => {
              setActiveTab('content');
              setShowAddForm(false);
              setEditingId(null);
            }}
            className={`px-6 py-3 font-semibold rounded-t-xl transition-all ${
              activeTab === 'content'
                ? 'bg-[#00a67e] text-white'
                : 'bg-[#0d1117] text-gray-300 hover:bg-[#161b22]'
            }`}
          >
            Content
          </button>
        </div>

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <>
            <div className="mb-6">
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="px-6 py-3 bg-[#00a67e] text-white font-semibold rounded-xl
                         hover:shadow-[0_0_20px_rgba(0,166,126,0.4)] transition-all"
              >
                {showAddForm ? "Cancel" : "+ Add Project"}
              </button>
            </div>

            {showAddForm && (
              <div className="bg-[#0d1117] p-6 rounded-2xl mb-8 border border-[#00a67e]/30">
                <h2 className="text-2xl font-bold mb-4 text-[#00a67e]">Add New Project</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Project Name"
                    value={(formData as Partial<ProjectData>).name || ""}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="p-3 rounded-lg bg-[#161b22] border border-[#00a67e]/30 text-white
                             focus:outline-none focus:border-[#00a67e]"
                  />
                  <input
                    type="text"
                    placeholder="Category"
                    value={(formData as Partial<ProjectData>).category || ""}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="p-3 rounded-lg bg-[#161b22] border border-[#00a67e]/30 text-white
                             focus:outline-none focus:border-[#00a67e]"
                  />
                  <input
                    type="text"
                    placeholder="Technologies (comma-separated)"
                    value={(formData as Partial<ProjectData>).technologies || ""}
                    onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                    className="p-3 rounded-lg bg-[#161b22] border border-[#00a67e]/30 text-white md:col-span-2
                             focus:outline-none focus:border-[#00a67e]"
                  />
                  <input
                    type="text"
                    placeholder="Image URL"
                    value={(formData as Partial<ProjectData>).image || ""}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="p-3 rounded-lg bg-[#161b22] border border-[#00a67e]/30 text-white
                             focus:outline-none focus:border-[#00a67e]"
                  />
                  <input
                    type="text"
                    placeholder="Project Link"
                    value={(formData as Partial<ProjectData>).link || ""}
                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                    className="p-3 rounded-lg bg-[#161b22] border border-[#00a67e]/30 text-white
                             focus:outline-none focus:border-[#00a67e]"
                  />
                  <textarea
                    placeholder="Description"
                    value={(formData as Partial<ProjectData>).description || ""}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="p-3 rounded-lg bg-[#161b22] border border-[#00a67e]/30 text-white md:col-span-2 h-24
                             focus:outline-none focus:border-[#00a67e]"
                  />
                </div>
                <button
                  onClick={handleAddProject}
                  className="mt-4 px-6 py-3 bg-[#00a67e] text-white font-semibold rounded-xl w-full
                           hover:shadow-[0_0_20px_rgba(0,166,126,0.4)] transition-all"
                >
                  Add Project
                </button>
              </div>
            )}

            <div className="space-y-4">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="bg-[#0d1117] p-6 rounded-2xl border border-[#00a67e]/20
                           hover:border-[#00a67e]/50 transition-all"
                >
                  {editingId === project.id ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                          type="text"
                          value={(formData as Partial<ProjectData>).name || ""}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="p-3 rounded-lg bg-[#161b22] border border-[#00a67e]/30 text-white
                                   focus:outline-none focus:border-[#00a67e]"
                        />
                        <input
                          type="text"
                          value={(formData as Partial<ProjectData>).category || ""}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          className="p-3 rounded-lg bg-[#161b22] border border-[#00a67e]/30 text-white
                                   focus:outline-none focus:border-[#00a67e]"
                        />
                        <input
                          type="text"
                          value={(formData as Partial<ProjectData>).technologies || ""}
                          onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                          className="p-3 rounded-lg bg-[#161b22] border border-[#00a67e]/30 text-white md:col-span-2
                                   focus:outline-none focus:border-[#00a67e]"
                        />
                        <input
                          type="text"
                          value={(formData as Partial<ProjectData>).image || ""}
                          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                          className="p-3 rounded-lg bg-[#161b22] border border-[#00a67e]/30 text-white
                                   focus:outline-none focus:border-[#00a67e]"
                        />
                        <input
                          type="text"
                          value={(formData as Partial<ProjectData>).link || ""}
                          onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                          className="p-3 rounded-lg bg-[#161b22] border border-[#00a67e]/30 text-white
                                   focus:outline-none focus:border-[#00a67e]"
                        />
                        <textarea
                          value={(formData as Partial<ProjectData>).description || ""}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          className="p-3 rounded-lg bg-[#161b22] border border-[#00a67e]/30 text-white md:col-span-2 h-24
                                   focus:outline-none focus:border-[#00a67e]"
                        />
                      </div>
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleUpdateProject(project.id)}
                          className="px-6 py-2 bg-[#00a67e] text-white rounded-lg hover:bg-[#00a67e]/90 transition-all"
                        >
                          Save
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="px-6 py-2 border border-gray-500 text-gray-300 rounded-lg hover:bg-gray-500/10 transition-all"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-[#00a67e] mb-2">{project.name}</h3>
                        <p className="text-gray-300 mb-2">{project.description}</p>
                        <div className="flex flex-wrap gap-2 mb-2">
                          <span className="text-sm bg-[#00a67e]/20 text-[#00a67e] px-3 py-1 rounded-lg">
                            {project.category}
                          </span>
                          <span className="text-sm text-gray-400">
                            Tech: {project.technologies}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500">
                          Status: <span className={project.status === 'active' ? 'text-green-400' : 'text-red-400'}>
                            {project.status}
                          </span>
                        </p>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => startEdit(project)}
                          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteProject(project.id)}
                          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {/* Content Tab */}
        {activeTab === 'content' && (
          <div className="space-y-4">
            <div className="bg-[#00a67e]/10 border border-[#00a67e]/30 p-4 rounded-xl mb-6">
              <p className="text-sm text-[#00a67e]">
                💡 <strong>Tip:</strong> Edit the text content that appears on your website. 
                Changes will be reflected immediately on the live site.
              </p>
            </div>

            {content.map((item) => (
              <div
                key={item.id}
                className="bg-[#0d1117] p-6 rounded-2xl border border-[#00a67e]/20
                         hover:border-[#00a67e]/50 transition-all"
              >
                {editingId === item.id ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-[#00a67e] mb-2">
                          Key (Identifier)
                        </label>
                        <input
                          type="text"
                          value={(formData as Partial<ContentData>).key || ""}
                          onChange={(e) => setFormData({ ...formData, key: e.target.value })}
                          className="w-full p-3 rounded-lg bg-[#161b22] border border-[#00a67e]/30 text-white
                                   focus:outline-none focus:border-[#00a67e]"
                          disabled
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-[#00a67e] mb-2">
                          Value (Content)
                        </label>
                        <textarea
                          value={(formData as Partial<ContentData>).value || ""}
                          onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                          className="w-full p-3 rounded-lg bg-[#161b22] border border-[#00a67e]/30 text-white h-32
                                   focus:outline-none focus:border-[#00a67e]"
                        />
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleUpdateContent(item.id)}
                        className="px-6 py-2 bg-[#00a67e] text-white rounded-lg hover:bg-[#00a67e]/90 transition-all"
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="px-6 py-2 border border-gray-500 text-gray-300 rounded-lg hover:bg-gray-500/10 transition-all"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-[#00a67e] mb-2">{item.key}</h3>
                      <p className="text-gray-300 whitespace-pre-wrap">{item.value}</p>
                    </div>
                    <button
                      onClick={() => startEdit(item)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all ml-4"
                    >
                      Edit
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}