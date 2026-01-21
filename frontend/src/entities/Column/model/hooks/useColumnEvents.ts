'use client'
import { useEffect } from 'react'
import { Socket } from 'socket.io-client'

import { useDndStore } from '@/features/drag-and-drop'

import { IColumn } from '../types/IColumn'

export const useColumnEvents = (socket: Socket | null, boardId: string) => {
	const setColumns = useDndStore(state => state.setColumns)

	useEffect(() => {
		if (!socket) return

		const onColumnCreated = (column: IColumn) => {
			setColumns(prev => [...prev, { ...column, cards: [] }])
		}

		const onColumnUpdated = (updatedColumn: IColumn) => {
			setColumns(prev =>
				prev.map(column =>
					column.id === updatedColumn.id
						? { ...column, ...updatedColumn }
						: column
				)
			)
		}

		const onColumnDeleted = ({ columnId }: { columnId: string }) => {
			setColumns(prev => prev.filter(column => column.id !== columnId))
		}

		const onColumnsReordered = (updatedColumns: IColumn[]) => {
			setColumns(prev =>
				prev
					.map(column => {
						const updated = updatedColumns.find(
							col => col.id == column.id
						)
						return updated
							? { ...column, position: updated.position }
							: column
					})
					.sort((a, b) => a.position - b.position)
			)
		}

		socket.on('column:created', onColumnCreated)
		socket.on('column:updated', onColumnUpdated)
		socket.on('column:deleted', onColumnDeleted)
		socket.on('column:reordered', onColumnsReordered)

		return () => {
			socket.off('column:created', onColumnCreated)
			socket.off('column:updated', onColumnUpdated)
			socket.off('column:deleted', onColumnDeleted)
			socket.off('column:reordered', onColumnsReordered)
		}
	}, [socket, boardId, setColumns])
}
