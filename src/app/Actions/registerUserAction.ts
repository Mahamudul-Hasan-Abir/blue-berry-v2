/* eslint-disable @typescript-eslint/no-explicit-any */
// interface RegisterPayload {
//   name: string;
//   email: string;
//   password: string;
//   phone: string;
//   address: string;
//   profileImage: string;
// }

// export const registerUserAction = async (
//   data: RegisterPayload
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
// ): Promise<{ token: string; data: any; message: string }> => {
//   const res = await fetch("http://localhost:5200/api/v2/auth/register", {
//     method: "POST",
//     headers: {
//       "Content-type": "application/json",
//     },
//     body: JSON.stringify(data),
//     cache: "no-store",
//   });
//   const responseData = await res.json();
//   console.log("consoling form server action", responseData);

//   if (!res.ok) {
//     throw new Error(responseData?.message || "Registration failed");
//   }
//   localStorage.setItem("accessToken", responseData.token);
//   localStorage.setItem("user", JSON.stringify(responseData.data));
//   return responseData;
// };
export const registerUserAction = async (
  data: FormData
): Promise<{ token: string; data: any; message: string }> => {
  const res = await fetch(
    `https://blue-berry-server-v2.vercel.app/api/v2/auth/register`,
    {
      method: "POST",
      body: data, // FormData handles encoding
      cache: "no-store",
    }
  );

  const responseData = await res.json();
  console.log("consoling form server action", responseData);

  if (!res.ok) {
    throw new Error(responseData?.message || "Registration failed");
  }

  localStorage.setItem("accessToken", responseData.token);
  localStorage.setItem("user", JSON.stringify(responseData.data));
  return responseData;
};
