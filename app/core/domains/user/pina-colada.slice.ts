import { createPinacoladaSlice, type GetDataFromUseCaseAction } from "~/core/utils";
import UserUseCase from '@/core/domains/user/use-case'
import { useMutation, useQuery } from "@pinia/colada";


export default createPinacoladaSlice<ReturnType<typeof UserUseCase>>()((useCase) => ({
  useDeleteAccount: () => useMutation({
    mutation: useCase.deleteAccount
  }),

  useGetMyInfo: (data: GetDataFromUseCaseAction<typeof useCase.getMyInfo>) => useQuery({
    key: ['user'],
    query: () => useCase.getMyInfo(data)
  }),

  useChangeWorkspace: () => useMutation({
    mutation: (data: GetDataFromUseCaseAction<typeof useCase.changeWorkspace>) => useCase.changeWorkspace(data)
  })
}))