"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {

  return (
    <div className="h-max py-12 lg:h-dvh lg:w-[100dvw] flex items-center justify-center gap-5">
      <div className="flex flex-col lg:flex-row items-center flex-wrap gap-6">
        <div>
          <Card className="max-w-[300px]">
            <CardHeader>
              <CardTitle>Validação de login</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3">
              <p className="text-sm">
                O padrão de autenticação implementado aqui é o NextAuth
              </p>
              <div className="text-gray-500">
                <p className="text-black">Tente os seguintes valores:</p>
                <p>email: test@example.com</p>
                <p>senha: password123</p>
              </div>
            </CardContent>
            <CardFooter className="grid gap-3">
              <p>
                Caso a autenticação seja concluida, será adicionado o cookie
                (next-auth.session-token) no seu navegador com as informações
                criptografadas do seu usuário.
              </p>
              <Link
                target="_blank"
                href={"https://next-auth.js.org/getting-started/example"}
                className="text-blue-500"
              >
                Mais informações
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
