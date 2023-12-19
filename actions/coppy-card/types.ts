import {z} from 'zod'
import { CoppyCard } from './schema'
import { ActionState } from '@/lib/create-safe-action'
import { Card } from '@prisma/client'

export type InputType = z.infer<typeof CoppyCard>
export type ReturnType = ActionState<InputType, Card>