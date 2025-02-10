import { baseURL } from "../config";

export const fetchTreeData = async () => {
  try {
    const response = await fetch(`${baseURL}/api/citizen/hierarchy`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (err) {
    console.error("Error fetching tree data:", err);
    throw err;
  }
};

export const addHierarchyNode = async (
  citizenId: string,
  group: { type: string; name: string }
) => {
  try {
    const response = await fetch(`${baseURL}/api/citizen/${citizenId}/groups`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(group),
    });

    if (!response.ok) {
      throw new Error("Ошибка при добавлении узла");
    }

    return await response.json();
  } catch (error) {
    console.error("Error adding group to citizen:", error);
    throw error;
  }
};
