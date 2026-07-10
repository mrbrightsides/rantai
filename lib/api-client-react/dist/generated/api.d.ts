import type { QueryKey, UseMutationOptions, UseMutationResult, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import type { HealthStatus, SiweError, SiweLogoutResult, SiweNonce, SiweSession, SiweVerifyInput } from './api.schemas';
import { customFetch } from '../custom-fetch';
import type { ErrorType, BodyType } from '../custom-fetch';
type AwaitedInput<T> = PromiseLike<T> | T;
type Awaited<O> = O extends AwaitedInput<infer T> ? T : never;
type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];
export declare const getHealthCheckUrl: () => string;
/**
 * Returns server health status
 * @summary Health check
 */
export declare const healthCheck: (options?: RequestInit) => Promise<HealthStatus>;
export declare const getHealthCheckQueryKey: () => readonly ["/api/healthz"];
export declare const getHealthCheckQueryOptions: <TData = Awaited<ReturnType<typeof healthCheck>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData> & {
    queryKey: QueryKey;
};
export type HealthCheckQueryResult = NonNullable<Awaited<ReturnType<typeof healthCheck>>>;
export type HealthCheckQueryError = ErrorType<unknown>;
/**
 * @summary Health check
 */
export declare function useHealthCheck<TData = Awaited<ReturnType<typeof healthCheck>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getGetSiweNonceUrl: () => string;
/**
 * Returns a one-time nonce for use in a SIWE message
 * @summary Get SIWE nonce
 */
export declare const getSiweNonce: (options?: RequestInit) => Promise<SiweNonce>;
export declare const getGetSiweNonceQueryKey: () => readonly ["/api/siwe/nonce"];
export declare const getGetSiweNonceQueryOptions: <TData = Awaited<ReturnType<typeof getSiweNonce>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getSiweNonce>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getSiweNonce>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetSiweNonceQueryResult = NonNullable<Awaited<ReturnType<typeof getSiweNonce>>>;
export type GetSiweNonceQueryError = ErrorType<unknown>;
/**
 * @summary Get SIWE nonce
 */
export declare function useGetSiweNonce<TData = Awaited<ReturnType<typeof getSiweNonce>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getSiweNonce>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getVerifySiweSignatureUrl: () => string;
/**
 * Verifies a signed SIWE message and creates a session
 * @summary Verify SIWE signature
 */
export declare const verifySiweSignature: (siweVerifyInput: SiweVerifyInput, options?: RequestInit) => Promise<SiweSession>;
export declare const getVerifySiweSignatureMutationOptions: <TError = ErrorType<SiweError>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof verifySiweSignature>>, TError, {
        data: BodyType<SiweVerifyInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof verifySiweSignature>>, TError, {
    data: BodyType<SiweVerifyInput>;
}, TContext>;
export type VerifySiweSignatureMutationResult = NonNullable<Awaited<ReturnType<typeof verifySiweSignature>>>;
export type VerifySiweSignatureMutationBody = BodyType<SiweVerifyInput>;
export type VerifySiweSignatureMutationError = ErrorType<SiweError>;
/**
* @summary Verify SIWE signature
*/
export declare const useVerifySiweSignature: <TError = ErrorType<SiweError>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof verifySiweSignature>>, TError, {
        data: BodyType<SiweVerifyInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof verifySiweSignature>>, TError, {
    data: BodyType<SiweVerifyInput>;
}, TContext>;
export declare const getGetSiweSessionUrl: () => string;
/**
 * Returns the current authenticated wallet address if a session exists
 * @summary Get current SIWE session
 */
export declare const getSiweSession: (options?: RequestInit) => Promise<SiweSession>;
export declare const getGetSiweSessionQueryKey: () => readonly ["/api/siwe/session"];
export declare const getGetSiweSessionQueryOptions: <TData = Awaited<ReturnType<typeof getSiweSession>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getSiweSession>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getSiweSession>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetSiweSessionQueryResult = NonNullable<Awaited<ReturnType<typeof getSiweSession>>>;
export type GetSiweSessionQueryError = ErrorType<unknown>;
/**
 * @summary Get current SIWE session
 */
export declare function useGetSiweSession<TData = Awaited<ReturnType<typeof getSiweSession>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getSiweSession>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getSiweLogoutUrl: () => string;
/**
 * Destroys the current SIWE session
 * @summary Logout / destroy session
 */
export declare const siweLogout: (options?: RequestInit) => Promise<SiweLogoutResult>;
export declare const getSiweLogoutMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof siweLogout>>, TError, void, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof siweLogout>>, TError, void, TContext>;
export type SiweLogoutMutationResult = NonNullable<Awaited<ReturnType<typeof siweLogout>>>;
export type SiweLogoutMutationError = ErrorType<unknown>;
/**
* @summary Logout / destroy session
*/
export declare const useSiweLogout: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof siweLogout>>, TError, void, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof siweLogout>>, TError, void, TContext>;
export {};
//# sourceMappingURL=api.d.ts.map