import {z} from 'zod'
import { CoppyList } from './schema'
import { ActionState } from '@/lib/create-safe-action'
import { List } from '@prisma/client'

export type InputType = z.infer<typeof CoppyList>
export type ReturnType = ActionState<InputType, List>