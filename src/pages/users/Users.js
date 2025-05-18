import React, { useState, useEffect, useContext } from "react";
import AddUserForm from "./AddUserForm";
import { LanguageContext, TranslationContext } from "../../App";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:8080/untitled_war_exploded/api/users";

const Users = () => {
  const [view, setView] = useState("add");
  const [users, setUsers] = useState([]);
  
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  
  const { language } = useContext(LanguageContext);
  const { translations } = useContext(TranslationContext);

  const handleUnauthorized = () => {
    localStorage.clear();
    navigate("/", { replace: true });
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Accept-Language": language,
        },
      });

      if (response.status === 401) return handleUnauthorized();

      const data = await response.json();
      const sortedUsers = data.data.sort((a, b) => a.id - b.id);
      setUsers(sortedUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [language]);

  const handleCreate = async (newUser) => {
    try {
      const response = await fetch(`${API_URL}/managers?lang=${language}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(newUser),
      });
  
      if (response.status === 401) return handleUnauthorized();
  
      await fetchUsers();
      setView("list");
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const handleCancel = () => {
    setView("list");
  };

  return (
    <div className="p-4">
      {view === "add" && (
        <AddUserForm
          onSubmit={handleCreate}
          onCancel={handleCancel}
          translations={translations}
        />
      )}
    </div>
  );
};

export default Users;
