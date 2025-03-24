import React, { useState, useEffect } from "react";
import { db, auth } from "../../firebase";
import { collection, addDoc, getDocs, deleteDoc, doc, getDoc, updateDoc,serverTimestamp  } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const AdminResources = () => {
  const [resources, setResources] = useState([]);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [editingResource, setEditingResource] = useState(null);
  const [role, setRole] = useState("");
  const predefinedCategories = [
    "AI/ML", "Web Development", "UI/UX", "Data Analyst", "Cloud Computing", "Programming Languages"
  ];

  useEffect(() => {
    const fetchUserRole = async () => {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setRole(docSnap.data().role);
        }
      }
    };
    fetchUserRole();
  }, []);

  useEffect(() => {
    fetchResources();
  }, []);


  const fetchResources = async () => {
    const querySnapshot = await getDocs(collection(db, "resources"));
    const fetchedResources = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      category: doc.data().category || [], // Ensure categories are stored as an array
    }));
    setResources(fetchedResources);
  };
  


  const addResource = async () => {
    try {
      if (!title || !type || !link || !description || selectedCategories.length === 0) {
        console.error("All fields are required!");
        return;
      }
  
      const resourceData = {
        title: title.trim(),
        type: type.trim(),
        link: link.trim(),
        description: description.trim(),
        category: Array.isArray(selectedCategories) ? selectedCategories : [selectedCategories], 
        createdAt: serverTimestamp(), // ✅ Firestore timestamp
      };
  
      if (editingResource) {
        await updateDoc(doc(db, "resources", editingResource.id), resourceData);
        toast.success("Resource updated successfully!");
        setEditingResource(null);
      } else {
        await addDoc(collection(db, "resources"), resourceData);
        toast.success("New resource added successfully!");
      }
  
      // Reset form fields
      setTitle("");
      setType("");
      setLink("");
      setDescription("");
      setSelectedCategories([]);
  
      // Refresh the resource list
      await fetchResources();  // Ensure it waits for data update
    } catch (error) {
      toast.error("Error adding/updating resource!");
      console.error("Error:", error);
    }
  };

  

  const deleteResource = async (id) => {
    try {
      await deleteDoc(doc(db, "resources", id));
      toast.success("Resource deleted successfully!");
      fetchResources();
    } catch (error) {
      toast.error("Failed to delete resource!");
      console.error("Error:", error);
    }
  };


  const startEditing = (resource) => {
    setTitle(resource.title);
    setType(resource.type);
    setLink(resource.link);
    setDescription(resource.description);
    setSelectedCategories(resource.categories || []);
    setEditingResource(resource);
  };

  const addCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setNewCategory("");
    }
  };

  return (

    <div className="p-0 space-y-0">
          <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    <div className="p-6 space-y-6">

      <div className="flex justify-between items-center">

        
        <h2 className="text-2xl font-semibold">Manage Resources</h2>
        
        <input
          type="text"
          placeholder="Search..."
          className="border p-2 rounded"
        />
      </div>

      {role === "admin" && (
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Add Resource</h3>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="block w-full p-2 border rounded mb-2"
          />
          <input
            type="text"
            placeholder="Type (PDF, Video, etc.)"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="block w-full p-2 border rounded mb-2"
          />
          <input
            type="text"
            placeholder="Resource Link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="block w-full p-2 border rounded mb-2"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="block w-full p-2 border rounded mb-2"
          />
          <div className="mb-2">
            <h4 className="font-semibold">Categories</h4>
            {predefinedCategories.map((category) => (
              <label key={category} className="mr-2">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedCategories([...selectedCategories, category]);
                    } else {
                      setSelectedCategories(selectedCategories.filter((c) => c !== category));
                    }
                  }}
                /> {category}
              </label>
            ))}
          </div>
          <input
            type="text"
            placeholder="Add new category"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="block w-full p-2 border rounded mb-2"
          />
          <button onClick={addCategory} className="px-4 py-2 bg-green-600 text-white rounded mb-2 mr-4">
            Add Category
          </button>
          <button onClick={addResource} className="px-4 py-2 bg-indigo-600 text-white rounded">
            {editingResource ? "Update Resource" : "Add Resource"}
          </button>
        </div>
      )}

      <div className="space-y-4">
        {resources.map((resource) => (
          <div key={resource.id} className="p-4 bg-white rounded-lg shadow flex justify-between items-center">
            <div>
              <h3 className="font-semibold">{resource.title}</h3>
              <p className="text-gray-600">Type: {resource.type}</p>
              <p className="text-gray-600">
              Categories: {Array.isArray(resource.category) ? resource.category.join(", ") : "No categories"}
              </p>

   

              <p className="text-gray-500">{resource.description}</p>

            </div>
            {role === "admin" && (
              <div>
                <button onClick={() => startEditing(resource)} className="px-4 py-2 bg-blue-600 text-white rounded mr-2">
                  Edit
                </button>
                <button onClick={() => deleteResource(resource.id)} className="px-4 py-2 bg-red-600 text-white rounded">
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default AdminResources;
