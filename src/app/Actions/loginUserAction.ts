export const loginUserAction = async (email: string, password: string) => {
  try {
    const response = await fetch(
      `https://blue-berry-server-v2.vercel.app/api/v2/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );

    const contentType = response.headers.get("content-type");

    if (contentType && contentType.includes("text/html")) {
      const htmlText = await response.text();
      const match = htmlText.match(/Error:\s([^<]+)/);
      const message = match ? match[1].trim() : "Unknown server error";
      throw new Error(message);
    }

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || "Login failed");
    }

    localStorage.setItem("accessToken", data.token);
    localStorage.setItem("user", JSON.stringify(data.data));
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong during login");
  }
};
