import { createPinacoladaSlice } from "~/core/utils";
import AuthUseCase from '@/core/domains/auth/use-case'
import { useMutation } from "@pinia/colada";

export default createPinacoladaSlice<ReturnType<typeof AuthUseCase>>()((useCase) => ({
  useLogin: () => useMutation({
    mutation: useCase.auth
  }),
  useRegister: () => useMutation({
    mutation: useCase.register
  })
}))