import { z } from "zod";

export const postSchema = z.object({
  title: z.string().min(1, "O título é obrigatório"),
  author: z.string().min(1, "O autor é obrigatório"),
  description: z.string().min(1, "A descrição é obrigatória"),
  content: z.string().min(1, "O conteúdo é obrigatório"),
});
