import { RouterProvider } from "@tanstack/react-router";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { router } from "./router";
import { LeadsProvider } from "@/contexts/LeadsContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LeadsProvider>
        <Toaster position="top-right" richColors closeButton />
        <RouterProvider router={router} />
      </LeadsProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;