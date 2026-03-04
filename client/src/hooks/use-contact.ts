import { useMutation } from "@tanstack/react-query";
import { api } from "@shared/routes";
import type { ContactInput } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";

export function useSubmitContact() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: ContactInput) => {
      const validated = api.contact.submit.input.parse(data);
      const res = await fetch(api.contact.submit.path, {
        method: api.contact.submit.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
      });

      if (!res.ok) {
        if (res.status === 400) {
          const error = api.contact.submit.responses[400].parse(await res.json());
          throw new Error(error.message);
        }
        throw new Error("Une erreur s'est produite lors de l'envoi.");
      }

      return api.contact.submit.responses[200].parse(await res.json());
    },
    onSuccess: () => {
      toast({
        title: "Message envoyé",
        description: "Nous avons bien reçu votre message. Nous vous répondrons dans les plus brefs délais.",
        variant: "default",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Erreur",
        description: error.message || "Impossible d'envoyer le message.",
        variant: "destructive",
      });
    },
  });
}
