import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

import { getUser } from '../api/userApi'
import { useUserStore } from '../store/useUserStore'

export const useGetUser = () => {
	const setUser = useUserStore(state => state.setUser)

	const { data, status, error } = useQuery({
		queryKey: ['get user data'],
		queryFn: getUser,
		retry: false
	})

	useEffect(() => {
		if (data) {
			setUser(data)
		}
	}, [data, setUser])

	return {
		data,
		status,
		error
	}
}
