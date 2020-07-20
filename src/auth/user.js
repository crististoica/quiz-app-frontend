export const verifyToken = async () => {
  try {
    const response = await fetch("http://localhost:8080/verify", {
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Error");
    }
    const data = await response.json();
    if (data.isLoggedIn) {
      return true;
    }
  } catch (error) {
    console.log(error);
  }

  return false;
};
