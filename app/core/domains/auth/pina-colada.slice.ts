import { createMutation, createPinacoladaSlice } from "~/core/utils";
import AuthUseCase from '@/core/domains/auth/use-case'

export default createPinacoladaSlice<ReturnType<typeof AuthUseCase>>()((useCase) => ({
  useLogin: () => createMutation({
    mutation: useCase.auth
  }),
  useRegister: () => createMutation({
    mutation: useCase.register
  }),
  useLogout: () => createMutation({
    mutation: useCase.logout
  })
}))