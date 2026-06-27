import {
	CollisionDetection,
	closestCenter,
	pointerWithin
} from '@dnd-kit/core'

export const kanbanCollisionDetection: CollisionDetection = args => {
	const activeType = args.active.data.current?.type

	if (activeType === 'column') {
		return closestCenter({
			...args,
			droppableContainers: args.droppableContainers.filter(
				container => container.data.current?.type === 'column'
			)
		})
	}

	const pointerCollisions = pointerWithin(args)
	if (pointerCollisions.length > 0) {
		return pointerCollisions
	}

	return closestCenter(args)
}
