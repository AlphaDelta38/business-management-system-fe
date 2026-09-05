import type {
  Api,
  ApiResponse,
  ApiData,
  ApiParams,
  ApiQuery,
} from './generated/api.gen';

type CustomOptions<T, P, Q> = {
  requestParams?: P;
  requestQuery?: Q;
  requestBody?: T;
};

type HttpOptions<T, P, Q> =
  Omit<RequestInit, 'body' | 'method'> &
  CustomOptions<T, P, Q>;

export type HttpProps<
  T extends keyof Api,
  R extends keyof Api[T],
> = {
  baseUrl?: string
  url: T,
  method: R,
  options?: HttpOptions<
    ApiData<T, R>,
    ApiParams<T, R>,
    ApiQuery<T, R>
  >,
  onSuccess?: (data: ApiResponse<T, R>) => void
}

type BuildUrlProps<
  T extends keyof Api,
  R extends keyof Api[T]
> = {
  url: T,
  params?: ApiParams<T, R>,
  query?: ApiQuery<T, R>,
}

const buildUrl = <
  T extends keyof Api,
  R extends keyof Api[T],
>(
  {
    url,
    params,
    query
  }: BuildUrlProps<T, R>
) => {
  let finalUrl = String(url);

  if (params) {
    for (const [key, value] of Object.entries(params)) {
      finalUrl = finalUrl.replace(
        `{${key}}`,
        encodeURIComponent(String(value)),
      );
    }
  }

  if (query) {
    const searchParams = new URLSearchParams();

    for (const [key, value] of Object.entries(query)) {
      if (value === undefined || value === null) {
        continue;
      }

      if (Array.isArray(value)) {
        for (const item of value) {
          searchParams.append(key, String(item));
        }
      } else {
        searchParams.set(key, String(value));
      }
    }

    const queryString = searchParams.toString();

    if (queryString) {
      finalUrl += `?${queryString}`;
    }
  }

  return finalUrl;
};

type CreateHttpOptions = Omit<
  RequestInit,
  'body' | 'method' | 'headers'
> & {
  baseUrl?: string
  headers?: HeadersInit
}

export type ApiError = {
  status: 'error'
  data: {
    message?: string
    statusCode: number
    type: string
  }
}

export const httpClient = async <
  T extends keyof Api,
  R extends keyof Api[T],
>(
  {
    url,
    method,
    options,
    onSuccess,
    baseUrl,
  }: HttpProps<T, R>
): Promise<ApiResponse<T, R>> => {
  const {
    requestParams,
    requestQuery,
    requestBody,
    ...requestOptions
  } = options ?? {}

  const finalUrl = buildUrl({
    url,
    params: requestParams,
    query: requestQuery,
  })

  const fullUrl = baseUrl
    ? `${baseUrl.replace(/\/$/, '')}/${finalUrl.replace(/^\//, '')}`
    : finalUrl

  const response = await fetch(fullUrl, {
    ...requestOptions,
    method: String(method),
    headers: {
      'Content-Type': 'application/json',
      ...requestOptions.headers,
    },
    body:
      requestBody !== undefined
        ? JSON.stringify(requestBody)
        : undefined,
  })

  if (!response.ok) {
    const errorPayload = await response.json().catch(() => null)
    const normalizedError: ApiError = errorPayload ?? {
      status: 'error',
      data: {
        statusCode: response.status,
        message: response.statusText || 'What\'s go wrong',
        type: 'NETWORK_OR_SERVER_ERROR',
      },
    }
    throw normalizedError
  }

  const data = await response.json()


  if (onSuccess && data) {
    onSuccess(data)
  }

  return data
}

export const createHttp = ({
  baseUrl,
  headers,
  ...other
}: CreateHttpOptions = {}) => {
  return <
    T extends keyof Api,
    R extends keyof Api[T],
  >(
    props: HttpProps<T, R>
  ): Promise<ApiResponse<T, R>> => {
    return httpClient<T, R>({
      ...props,
      baseUrl,
      options: {
        ...props.options,
        headers: {
          ...headers,
          ...props.options?.headers,
        },
        ...other,
      },
    })
  }
}