import { ActionState } from "@/lib/create-safe-action"
import { StripDirection } from "./schema"
import {z} from 'zod'

export type InputType = z.infer< typeof StripDirection>
export type ReturnType = ActionState<InputType, string>