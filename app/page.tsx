
"use client";

import React from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Home from ".";
import { GoogleOAuthProvider } from "@react-oauth/google"
import { Toaster } from "react-hot-toast";

const queryCLient = new QueryClient()


export default function Temp() {

  return (
    <div>
      <QueryClientProvider client={queryCLient}>

        <GoogleOAuthProvider clientId="1016201923722-jvdsrhap2c43qp21lk5ijq2gjat98uj6.apps.googleusercontent.com">
          <Home />
          <Toaster />
        </GoogleOAuthProvider>
        <ReactQueryDevtools />
        </QueryClientProvider>
    </div>
  );
}


