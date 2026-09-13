import { createUseCase, type getUseCaseActionData } from "@/core/utils";

export default createUseCase(({ httpClient }) => ({
  create: async (data: getUseCaseActionData<'/workspace', "POST">) => {
    return await httpClient({ method: 'POST', url: '/workspace', ...data })
  },
}))
