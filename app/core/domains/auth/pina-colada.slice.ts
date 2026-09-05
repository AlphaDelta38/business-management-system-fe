import { createMutation, createPinacoladaSlice } from "~/core/utils";
import AuthUseCase from '@/core/domains/auth/use-case'
import { useMutation } from "@pinia/colada";

export default createPinacoladaSlice<ReturnType<typeof AuthUseCase>>()((useCase) => ({
  useLogin: () => createMutation({
    mutation: useCase.auth
  }),
  useRegister: () => createMutation({
    mutation: useCase.register
  })
}))