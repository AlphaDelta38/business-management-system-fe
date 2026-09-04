import { createUseCase, type getUseCaseActionData } from "@/core/utils";

export default createUseCase(({ httpClient }) => ({
  auth: async (data: getUseCaseActionData<'/auth/login', "POST">) => {
    return await httpClient({ method: 'POST', url: '/auth/login', ...data })
  },
  register: async (data: getUseCaseActionData<'/auth/register', "POST">) => {
    return await httpClient({ method: 'POST', url: '/auth/register', ...data })
  },
  logout: async (data: getUseCaseActionData<'/auth/logout', "DELETE">) => {
    return await httpClient({ method: 'DELETE', url: '/auth/logout', ...data })
  }
}))
