import {z} from 'zod'
import { createList } from './schema'
import { ActionState } from '@/lib/create-safe-action'
import { List } from '@prisma/client'

export type InputType = z.infer<typeof createList>
export type ReturnType = ActionState<InputType, List>