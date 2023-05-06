"use client";
import { User } from "@prisma/client";
//
// const useAuth = () => {
//   const signIn = (dto: {
//     email: string;
//     password: string;
//   }): Promise<(User & { token: string }) | null> => {
//     return fetch("/api/auth/login", {
//       method: "POST",
//       body: JSON.stringify(dto),
//       credentials: "include",
//     })
//       .then((res) => {
//         if (res.status === 200) {
//           return res.json();
//         }
//         return Promise.reject(`Failed ${res.status}`);
//       })
//       .then((data) => {
//         alert("Success");
//         return data;
//       })
//       .catch((err) => {
//         alert(err.message);
//         return null;
//       });
//   };
//
//   const signUp = () => {};
//   const signOut = () => {};
//
//   return {
//     signIn,
//     signOut,
//     signUp,
//   };
// };
// export default useAuth;

export const signIn = (dto: {
  email: string;
  password: string;
}): Promise<(User & { token: string }) | null> => {
  return fetch("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(dto),
    credentials: "include",
  })
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      }
      return Promise.reject(`Failed ${res.status}. ${res.statusText}`);
    })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return null;
    });
};

export const signUp = () => {};
export const signOut = () => {
  return fetch("/api/auth/signout", {
    method: "POST",
    credentials: "include",
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      return !!data;
    })
    .catch((err) => {
      console.log(err.message);
      return false;
    });
};
