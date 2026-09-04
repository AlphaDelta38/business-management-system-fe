import type * as Generated from './types.gen';

export type Api = {
  '/': {
    GET: {
      params: {};
      query: {};
      data: {};
      response: Generated.AppControllerGetHelloResponses[200];
    };
  };

  '/user': {
    GET: {
      params: {};
      query: {};
      data: {};
      response: Generated.UserControllerFindOneResponses[200];
    };
    DELETE: {
      params: {};
      query: {};
      data: {};
      response: Generated.UserControllerRemoveResponses[200];
    };
  };

  '/user/set_workspace/{workspaceId}': {
    POST: {
      params: Generated.UserControllerSetWorkspaceData['path'];
      query: {};
      data: {};
      response: Generated.UserControllerSetWorkspaceResponses[200];
    };
  };

  '/auth/login': {
    POST: {
      params: {};
      query: {};
      data: Generated.AuthControllerAuthData['body'];
      response: Generated.AuthControllerAuthResponses[201];
    };
  };

  '/auth/register': {
    POST: {
      params: {};
      query: {};
      data: Generated.AuthControllerRegisterData['body'];
      response: Generated.AuthControllerRegisterResponses[201];
    };
  };

  '/auth/logout': {
    DELETE: {
      params: {};
      query: {};
      data: {};
      response: Generated.AuthControllerLogoutResponses[200];
    };
  };

  '/workspace': {
    POST: {
      params: {};
      query: {};
      data: Generated.WorkspaceControllerCreateData['body'];
      response: Generated.WorkspaceControllerCreateResponses[201];
    };
    GET: {
      params: {};
      query: {};
      data: {};
      response: Generated.WorkspaceControllerFindAllResponses[200];
    };
  };

  '/workspace/join': {
    POST: {
      params: {};
      query: {};
      data: Generated.WorkspaceControllerJoinData['body'];
      response: Generated.WorkspaceControllerJoinResponses[201];
    };
  };

  '/workspace/{id}': {
    GET: {
      params: Generated.WorkspaceControllerFindOneData['path'];
      query: {};
      data: {};
      response: Generated.WorkspaceControllerFindOneResponses[200];
    };
    PATCH: {
      params: Generated.WorkspaceControllerUpdateData['path'];
      query: {};
      data: Generated.WorkspaceControllerUpdateData['body'];
      response: Generated.WorkspaceControllerUpdateResponses[200];
    };
    DELETE: {
      params: Generated.WorkspaceControllerRemoveData['path'];
      query: {};
      data: {};
      response: Generated.WorkspaceControllerRemoveResponses[200];
    };
  };

  '/workspace/{id}/kick/{userId}': {
    DELETE: {
      params: Generated.WorkspaceControllerKickData['path'];
      query: {};
      data: {};
      response: Generated.WorkspaceControllerKickResponses[200];
    };
  };

  '/permission': {
    POST: {
      params: {};
      query: {};
      data: Generated.PermissionControllerCreateData['body'];
      response: Generated.PermissionControllerCreateResponses[201];
    };
    GET: {
      params: {};
      query: {};
      data: {};
      response: Generated.PermissionControllerFindAllResponses[200];
    };
  };

  '/permission/{id}': {
    GET: {
      params: Generated.PermissionControllerFindOneData['path'];
      query: {};
      data: {};
      response: Generated.PermissionControllerFindOneResponses[200];
    };
    PATCH: {
      params: Generated.PermissionControllerUpdateData['path'];
      query: {};
      data: Generated.PermissionControllerUpdateData['body'];
      response: Generated.PermissionControllerUpdateResponses[200];
    };
    DELETE: {
      params: Generated.PermissionControllerRemoveData['path'];
      query: {};
      data: {};
      response: Generated.PermissionControllerRemoveResponses[200];
    };
  };

  '/invite-code': {
    POST: {
      params: {};
      query: {};
      data: Generated.InviteCodeControllerCreateData['body'];
      response: Generated.InviteCodeControllerCreateResponses[201];
    };
    GET: {
      params: {};
      query: {};
      data: {};
      response: Generated.InviteCodeControllerFindAllResponses[200];
    };
  };

  '/invite-code/{id}': {
    GET: {
      params: Generated.InviteCodeControllerFindOneData['path'];
      query: {};
      data: {};
      response: Generated.InviteCodeControllerFindOneResponses[200];
    };
    PATCH: {
      params: Generated.InviteCodeControllerUpdateData['path'];
      query: {};
      data: Generated.InviteCodeControllerUpdateData['body'];
      response: Generated.InviteCodeControllerUpdateResponses[200];
    };
    DELETE: {
      params: Generated.InviteCodeControllerRemoveData['path'];
      query: {};
      data: {};
      response: Generated.InviteCodeControllerRemoveResponses[200];
    };
  };

  '/commission': {
    POST: {
      params: {};
      query: {};
      data: Generated.CommissionControllerCreateData['body'];
      response: Generated.CommissionControllerCreateResponses[201];
    };
    GET: {
      params: {};
      query: {};
      data: {};
      response: Generated.CommissionControllerFindAllResponses[200];
    };
  };

  '/commission/{id}': {
    GET: {
      params: Generated.CommissionControllerFindOneData['path'];
      query: {};
      data: {};
      response: Generated.CommissionControllerFindOneResponses[200];
    };
    PATCH: {
      params: Generated.CommissionControllerUpdateData['path'];
      query: {};
      data: Generated.CommissionControllerUpdateData['body'];
      response: Generated.CommissionControllerUpdateResponses[200];
    };
    DELETE: {
      params: Generated.CommissionControllerRemoveData['path'];
      query: {};
      data: {};
      response: Generated.CommissionControllerRemoveResponses[200];
    };
  };

  '/attribute': {
    POST: {
      params: {};
      query: {};
      data: Generated.AttributeControllerCreateData['body'];
      response: Generated.AttributeControllerCreateResponses[201];
    };
    GET: {
      params: {};
      query: Generated.AttributeControllerFindAllData['query'];
      data: {};
      response: Generated.AttributeControllerFindAllResponses[200];
    };
  };

  '/attribute/{id}': {
    GET: {
      params: Generated.AttributeControllerFindOneData['path'];
      query: {};
      data: {};
      response: Generated.AttributeControllerFindOneResponses[200];
    };
    PATCH: {
      params: Generated.AttributeControllerUpdateData['path'];
      query: {};
      data: Generated.AttributeControllerUpdateData['body'];
      response: Generated.AttributeControllerUpdateResponses[200];
    };
    DELETE: {
      params: Generated.AttributeControllerRemoveData['path'];
      query: {};
      data: {};
      response: Generated.AttributeControllerRemoveResponses[200];
    };
  };

  '/attribute-type': {
    POST: {
      params: {};
      query: {};
      data: Generated.AttributeTypeControllerCreateData['body'];
      response: Generated.AttributeTypeControllerCreateResponses[201];
    };
    GET: {
      params: {};
      query: {};
      data: {};
      response: Generated.AttributeTypeControllerFindAllResponses[200];
    };
  };

  '/attribute-type/{id}': {
    GET: {
      params: Generated.AttributeTypeControllerFindOneData['path'];
      query: {};
      data: {};
      response: Generated.AttributeTypeControllerFindOneResponses[200];
    };
    PATCH: {
      params: Generated.AttributeTypeControllerUpdateData['path'];
      query: {};
      data: Generated.AttributeTypeControllerUpdateData['body'];
      response: Generated.AttributeTypeControllerUpdateResponses[200];
    };
    DELETE: {
      params: Generated.AttributeTypeControllerRemoveData['path'];
      query: {};
      data: {};
      response: Generated.AttributeTypeControllerRemoveResponses[200];
    };
  };

  '/product': {
    POST: {
      params: {};
      query: {};
      data: Generated.ProductControllerCreateData['body'];
      response: Generated.ProductControllerCreateResponses[201];
    };
    GET: {
      params: {};
      query: {};
      data: {};
      response: Generated.ProductControllerFindAllResponses[200];
    };
  };

  '/product/{id}': {
    GET: {
      params: Generated.ProductControllerFindOneData['path'];
      query: {};
      data: {};
      response: Generated.ProductControllerFindOneResponses[200];
    };
    PATCH: {
      params: Generated.ProductControllerUpdateData['path'];
      query: {};
      data: Generated.ProductControllerUpdateData['body'];
      response: Generated.ProductControllerUpdateResponses[200];
    };
    DELETE: {
      params: Generated.ProductControllerRemoveData['path'];
      query: {};
      data: {};
      response: Generated.ProductControllerRemoveResponses[200];
    };
  };

  '/customer': {
    POST: {
      params: {};
      query: {};
      data: Generated.CustomerControllerCreateData['body'];
      response: Generated.CustomerControllerCreateResponses[201];
    };
    GET: {
      params: {};
      query: {};
      data: {};
      response: Generated.CustomerControllerFindAllResponses[200];
    };
  };

  '/customer/{id}': {
    GET: {
      params: Generated.CustomerControllerFindOneData['path'];
      query: {};
      data: {};
      response: Generated.CustomerControllerFindOneResponses[200];
    };
    PATCH: {
      params: Generated.CustomerControllerUpdateData['path'];
      query: {};
      data: Generated.CustomerControllerUpdateData['body'];
      response: Generated.CustomerControllerUpdateResponses[200];
    };
    DELETE: {
      params: Generated.CustomerControllerRemoveData['path'];
      query: {};
      data: {};
      response: Generated.CustomerControllerRemoveResponses[200];
    };
  };

  '/order': {
    POST: {
      params: {};
      query: {};
      data: Generated.OrderControllerCreateData['body'];
      response: Generated.OrderControllerCreateResponses[201];
    };
    GET: {
      params: {};
      query: {};
      data: {};
      response: Generated.OrderControllerFindAllResponses[200];
    };
  };

  '/order/{id}': {
    GET: {
      params: Generated.OrderControllerFindOneData['path'];
      query: {};
      data: {};
      response: Generated.OrderControllerFindOneResponses[200];
    };
    PATCH: {
      params: Generated.OrderControllerUpdateData['path'];
      query: {};
      data: Generated.OrderControllerUpdateData['body'];
      response: Generated.OrderControllerUpdateResponses[200];
    };
    DELETE: {
      params: Generated.OrderControllerRemoveData['path'];
      query: {};
      data: {};
      response: Generated.OrderControllerRemoveResponses[200];
    };
  };

};

export type ApiPath = keyof Api;

export type ApiMethod<
  P extends ApiPath
> = keyof Api[P];

export type ApiOperation<
  P extends ApiPath,
  M extends ApiMethod<P>
> = Api[P][M];

export type ApiParams<
  P extends ApiPath,
  M extends ApiMethod<P>
> = ApiOperation<P, M> extends { params: infer T } ? T : never;

export type ApiQuery<
  P extends ApiPath,
  M extends ApiMethod<P>
> = ApiOperation<P, M> extends { query: infer T } ? T : never;

export type ApiData<
  P extends ApiPath,
  M extends ApiMethod<P>
> = ApiOperation<P, M> extends { data: infer T } ? T : never;

export type ApiResponse<
  P extends ApiPath,
  M extends ApiMethod<P>
> = ApiOperation<P, M> extends { response: infer T } ? T : never;
