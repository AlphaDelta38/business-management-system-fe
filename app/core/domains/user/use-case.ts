import { createUseCase, type getUseCaseActionData } from "@/core/utils";

export default createUseCase(({ httpClient, userStore, router }) => ({
  getMyInfo: async (data: getUseCaseActionData<'/user', "GET">) => {
    try {
      const respose = await httpClient({ method: 'GET', url: '/user', ...data })

      if (respose.data && respose.status === 'success') {
        userStore.setUser(respose.data)
      }

      return respose
    } catch (error) {
      router.replace('/auth')
      throw error
    }
  },
  deleteAccount: async (data: getUseCaseActionData<'/user', "DELETE">) => {
    return await httpClient({ method: 'DELETE', url: '/user', ...data })
  },
  changeWorkspace: async (data: getUseCaseActionData<'/user/set_workspace/{workspaceId}', "POST">) => {
    return await httpClient({ method: 'POST', url: '/user/set_workspace/{workspaceId}', ...data })
  }
}))
