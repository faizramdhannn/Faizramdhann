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

export default function AdminDashboard() {
  const router = useRouter();
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Partial<ProjectData>>({});
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    const isAuth = sessionStorage.getItem("adminAuth");
    if (!isAuth) {
      router.push("/login");
      return;
    }
    fetchProjects();
  }, [router]);

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/admin/projects");
      if (response.ok) {
        const data = await response.json();
        setProjects(data);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    try {
      const response = await fetch("/api/admin/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await fetchProjects();
        setShowAddForm(false);
        setFormData({});
      }
    } catch (error) {
      console.error("Error adding project:", error);
    }
  };

  const handleUpdate = async (id: number) => {
    try {
      const response = await fetch("/api/admin/projects", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, id }),
      });

      if (response.ok) {
        await fetchProjects();
        setEditingId(null);
        setFormData({});
      }
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      const response = await fetch(`/api/admin/projects?id=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await fetchProjects();
      }
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("adminAuth");
    router.push("/");
  };

  const startEdit = (project: ProjectData) => {
    setEditingId(project.id);
    setFormData(project);
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
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">
            Admin <span className="text-[#00a67e]">Dashboard</span>
          </h1>
          <div className="flex gap-3">
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-6 py-3 bg-[#00a67e] text-white font-semibold rounded-xl
                       hover:shadow-[0_0_20px_rgba(0,166,126,0.4)] transition-all"
            >
              {showAddForm ? "Cancel" : "+ Add Project"}
            </button>
            <button
              onClick={handleLogout}
              className="px-6 py-3 border-2 border-red-500 text-red-500 font-semibold rounded-xl
                       hover:bg-red-500/10 transition-all"
            >
              Logout
            </button>
          </div>
        </div>

        {showAddForm && (
          <div className="bg-[#0d1117] p-6 rounded-2xl mb-8 border border-[#00a67e]/30">
            <h2 className="text-2xl font-bold mb-4 text-[#00a67e]">Add New Project</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Project Name"
                value={formData.name || ""}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="p-3 rounded-lg bg-[#161b22] border border-[#00a67e]/30 text-white"
              />
              <input
                type="text"
                placeholder="Category"
                value={formData.category || ""}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="p-3 rounded-lg bg-[#161b22] border border-[#00a67e]/30 text-white"
              />
              <input
                type="text"
                placeholder="Technologies (comma-separated)"
                value={formData.technologies || ""}
                onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                className="p-3 rounded-lg bg-[#161b22] border border-[#00a67e]/30 text-white md:col-span-2"
              />
              <input
                type="text"
                placeholder="Image URL"
                value={formData.image || ""}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="p-3 rounded-lg bg-[#161b22] border border-[#00a67e]/30 text-white"
              />
              <input
                type="text"
                placeholder="Project Link"
                value={formData.link || ""}
                onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                className="p-3 rounded-lg bg-[#161b22] border border-[#00a67e]/30 text-white"
              />
              <textarea
                placeholder="Description"
                value={formData.description || ""}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="p-3 rounded-lg bg-[#161b22] border border-[#00a67e]/30 text-white md:col-span-2 h-24"
              />
            </div>
            <button
              onClick={handleAdd}
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
                      value={formData.name || ""}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="p-3 rounded-lg bg-[#161b22] border border-[#00a67e]/30 text-white"
                    />
                    <input
                      type="text"
                      value={formData.category || ""}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="p-3 rounded-lg bg-[#161b22] border border-[#00a67e]/30 text-white"
                    />
                    <input
                      type="text"
                      value={formData.technologies || ""}
                      onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                      className="p-3 rounded-lg bg-[#161b22] border border-[#00a67e]/30 text-white md:col-span-2"
                    />
                    <input
                      type="text"
                      value={formData.image || ""}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      className="p-3 rounded-lg bg-[#161b22] border border-[#00a67e]/30 text-white"
                    />
                    <input
                      type="text"
                      value={formData.link || ""}
                      onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                      className="p-3 rounded-lg bg-[#161b22] border border-[#00a67e]/30 text-white"
                    />
                    <textarea
                      value={formData.description || ""}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="p-3 rounded-lg bg-[#161b22] border border-[#00a67e]/30 text-white md:col-span-2 h-24"
                    />
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleUpdate(project.id)}
                      className="px-6 py-2 bg-[#00a67e] text-white rounded-lg hover:bg-[#00a67e]/90"
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="px-6 py-2 border border-gray-500 text-gray-300 rounded-lg hover:bg-gray-500/10"
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
                      onClick={() => handleDelete(project.id)}
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
      </div>
    </div>
  );
}