import type { UseCaseEnviroment } from "./utils"

import AuthPinaColadaSlice from '@/core/domains/auth/pina-colada.slice'
import AuthUseCase from '@/core/domains/auth/use-case'

import UserPinaColadaSlice from '@/core/domains/user/pina-colada.slice'
import UserUseCase from '@/core/domains/user/use-case'

import WorkspacePinaColadaSlice from '@/core/domains/workspace/pina-colada.slice'
import WorkspaceUseCase from '@/core/domains/workspace/use-case'

interface DIContainer {
  auth: ReturnType<typeof AuthPinaColadaSlice>
  user: ReturnType<typeof UserPinaColadaSlice>
  workspace: ReturnType<typeof WorkspacePinaColadaSlice>
}

let diContainer: DIContainer

export function getDICOntainer(): DIContainer {
  return diContainer!
}

export function initDIContainer(data: UseCaseEnviroment): void {
  diContainer = {
    auth: AuthPinaColadaSlice(AuthUseCase(data)),
    user: UserPinaColadaSlice(UserUseCase(data)),
    workspace: WorkspacePinaColadaSlice(WorkspaceUseCase(data))
  }
}