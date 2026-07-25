'use client'

import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'

type AdminListQueryConfig<TData, TFilters> = {
	queryKey: (filters: TFilters) => readonly unknown[]
	queryFn: (filters: TFilters) => Promise<TData>
}

export const createAdminListQuery = <TData, TFilters>(
	config: AdminListQueryConfig<TData, TFilters>
) => {
	return (filters: TFilters): UseQueryResult<TData, AxiosError> =>
		useQuery<TData, AxiosError>({
			queryKey: config.queryKey(filters),
			queryFn: () => config.queryFn(filters),
			placeholderData: previousData => previousData
		})
}
