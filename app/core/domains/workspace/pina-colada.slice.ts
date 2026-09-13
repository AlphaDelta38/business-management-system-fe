import { createMutation, createPinacoladaSlice, type GetDataFromUseCaseAction } from "@/core/utils";
import UserUseCase from '@/core/domains/workspace/use-case'

export default createPinacoladaSlice<ReturnType<typeof UserUseCase>>()((useCase) => ({
  useCreateWorkspace: () => createMutation({
    mutation: (data: GetDataFromUseCaseAction<typeof useCase.create>) => useCase.create(data)
  })
}))
