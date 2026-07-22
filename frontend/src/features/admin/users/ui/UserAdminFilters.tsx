'use client'

import { Search, X } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useRef } from 'react'

import { UserRole } from '@/entities/User'

import { Button, Input } from '@/shared/ui/external'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/shared/ui/external'

import { buildAdminUsersQuery } from '../model/lib/admin-users-query'
import { AdminUsersFilters } from '../model/types/AdminUserTypes'

export const UserAdminFilters = ({
	filters
}: {
	filters: AdminUsersFilters
}) => {
	const t = useTranslations('admin.users.filters')
	const router = useRouter()
	const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

	const pushFilters = (patch: Partial<AdminUsersFilters>) => {
		router.push(
			`?${buildAdminUsersQuery({
				...filters,
				page: 1,
				...patch
			})}`
		)
	}

	const handleSearchChange = (value: string) => {
		if (debounceRef.current) {
			clearTimeout(debounceRef.current)
		}

		debounceRef.current = setTimeout(() => {
			const trimmed = value.trim()
			if (trimmed === (filters.search ?? '')) return

			pushFilters({ search: trimmed || undefined })
		}, 300)
	}

	const clearSearch = () => {
		if (debounceRef.current) {
			clearTimeout(debounceRef.current)
		}

		pushFilters({ search: undefined })
	}

	return (
		<div className='flex flex-col gap-3 sm:flex-row sm:items-center'>
			<div className='relative flex-1'>
				<Search
					size={16}
					className='absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground'
				/>
				<Input
					key={filters.search ?? ''}
					defaultValue={filters.search ?? ''}
					onChange={e => handleSearchChange(e.target.value)}
					placeholder={t('searchPlaceholder')}
					className='pl-9 pr-9'
				/>
				{(filters.search ?? '').length > 0 && (
					<Button
						type='button'
						variant='ghost'
						size='icon'
						className='absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2'
						onClick={clearSearch}
					>
						<X size={14} />
					</Button>
				)}
			</div>
			<Select
				value={filters.role ?? 'all'}
				onValueChange={value =>
					pushFilters({
						role: value as UserRole | 'all'
					})
				}
			>
				<SelectTrigger className='w-full sm:w-40'>
					<SelectValue placeholder={t('rolePlaceholder')} />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value='all'>{t('roles.all')}</SelectItem>
					<SelectItem value='USER'>{t('roles.USER')}</SelectItem>
					<SelectItem value='ADMIN'>{t('roles.ADMIN')}</SelectItem>
					<SelectItem value='CREATOR'>
						{t('roles.CREATOR')}
					</SelectItem>
				</SelectContent>
			</Select>
			<Select
				value={filters.status ?? 'all'}
				onValueChange={value =>
					pushFilters({
						status: value as AdminUsersFilters['status']
					})
				}
			>
				<SelectTrigger className='w-full sm:w-40'>
					<SelectValue placeholder={t('statusPlaceholder')} />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value='all'>{t('status.all')}</SelectItem>
					<SelectItem value='banned'>{t('status.banned')}</SelectItem>
				</SelectContent>
			</Select>
		</div>
	)
}
