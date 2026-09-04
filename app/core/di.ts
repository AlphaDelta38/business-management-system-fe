import type { UseCaseEnviroment } from "./utils"

import AuthPinaColadaSlice from '@/core/domains/auth/pina-colada.slice'
import AuthUseCase from '@/core/domains/auth/use-case'

import UserPinaColadaSlice from '@/core/domains/user/pina-colada.slice'
import UserUseCase from '@/core/domains/user/use-case'

interface DIContainer {
  auth: ReturnType<typeof AuthPinaColadaSlice>
  user: ReturnType<typeof UserPinaColadaSlice>
}

let diContainer: DIContainer

export function getDICOntainer(): DIContainer {
  return diContainer!
}

export function initDIContainer(data: UseCaseEnviroment): void {
  diContainer = {
    auth: AuthPinaColadaSlice(AuthUseCase(data)),
    user: UserPinaColadaSlice(UserUseCase(data))
  }
}