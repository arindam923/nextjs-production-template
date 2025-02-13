import { createAuthClient } from "better-auth/react";
import { oneTapClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: "http://localhost:3000",
  // plugins: [
  //   oneTapClient({
  //     clientId:
  //       "581121269261-99f3ksbm7f9q2oea5a4lt5aocipoe1eb.apps.googleusercontent.com",
  //   }),
  // ],
});
