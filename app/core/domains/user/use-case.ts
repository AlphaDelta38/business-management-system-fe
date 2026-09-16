import { createUseCase, type getUseCaseActionData } from "@/core/utils";

export default createUseCase(({ httpClient }) => ({
  getMyInfo: async (data: getUseCaseActionData<'/user', "GET">) => {
    return await httpClient({ method: 'GET', url: '/user', ...data })
  },
  deleteAccount: async (data: getUseCaseActionData<'/user', "DELETE">) => {
    return await httpClient({ method: 'DELETE', url: '/user', ...data })
  },
}))
