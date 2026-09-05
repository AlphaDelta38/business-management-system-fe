import type { ApiError, createHttp, HttpProps } from "@/core/http";
import type { Api } from "./generated/api.gen";
import { useUserStore } from "@/lib/stores/user.store";
import { useMutation, useQuery, type UseMutationOptions, type UseQueryOptions } from "@pinia/colada";

export type UseCaseEnviroment = {
  route: ReturnType<typeof useRoute>
  router: ReturnType<typeof useRouter>
  httpClient: ReturnType<typeof createHttp>
  userStore: ReturnType<typeof useUserStore>
};

export type getUseCaseActionData<T extends keyof Api, R extends keyof Api[T]> = Omit<HttpProps<T, R>, 'url' | 'method' | 'baseUrl'>

export type GetDataFromUseCaseAction<
  T extends (...args: any[]) => any
> = Parameters<T>[0]

const createUseCase = <T extends object>(
  callback: (env: UseCaseEnviroment) => T
): (env: UseCaseEnviroment) => T => {
  return (env) => callback(env);
};

const createPinacoladaSlice = <T>() => {
  return <R extends (data: T) => any>(
    callback: R
  ): (useCaseData: T) => ReturnType<R> => {
    return (useCaseData) => callback(useCaseData);
  };
};

function createQuery<TData, TDataInitial extends TData | undefined = undefined>(
  options: UseQueryOptions<TData, ApiError, TDataInitial>
) {
  return useQuery<TData, ApiError, TDataInitial>(options)
}

function createMutation<TData, TVars>(
  options: UseMutationOptions<TData, TVars, ApiError>
) {
  return useMutation<TData, TVars, ApiError>(options)
}

export {
  createPinacoladaSlice,
  createUseCase,
  createMutation,
  createQuery
}