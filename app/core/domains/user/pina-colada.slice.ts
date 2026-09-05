import { createMutation, createPinacoladaSlice, createQuery, type GetDataFromUseCaseAction } from "@/core/utils";
import UserUseCase from '@/core/domains/user/use-case'


export default createPinacoladaSlice<ReturnType<typeof UserUseCase>>()((useCase) => ({
  useDeleteAccount: () => createMutation({
    mutation: useCase.deleteAccount
  }),

  useGetMyInfo: (data: GetDataFromUseCaseAction<typeof useCase.getMyInfo>) => createQuery({
    key: ['user'],
    query: () => useCase.getMyInfo(data)
  }),

  useChangeWorkspace: () => createMutation({
    mutation: (data: GetDataFromUseCaseAction<typeof useCase.changeWorkspace>) => useCase.changeWorkspace(data)
  })
}))