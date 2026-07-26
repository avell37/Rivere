'use client'

import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { useQueryApiError } from '@/shared/hooks/useQueryApiError'

type AdminListQueryConfig<TData, TFilters> = {
	queryKey: (filters: TFilters) => readonly unknown[]
	queryFn: (filters: TFilters) => Promise<TData>
}

export const createAdminListQuery = <TData, TFilters>(
	config: AdminListQueryConfig<TData, TFilters>
) => {
	return (
		filters: TFilters,
		enabled = true
	): UseQueryResult<TData, AxiosError> => {
		const query = useQuery<TData, AxiosError>({
			queryKey: config.queryKey(filters),
			queryFn: () => config.queryFn(filters),
			placeholderData: previousData => previousData,
			enabled
		})

		useQueryApiError(query.error, query.isError && enabled)

		return query
	}
}
