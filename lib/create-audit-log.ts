import { auth, currentUser } from "@clerk/nextjs"
import { ACTION, ENTITY_TYPE } from "@prisma/client"
import { db } from "./db";

interface AuditLogProps {
    entityId: string,
    entityTitle: string,
    entityType: ENTITY_TYPE,
    action: ACTION
}

export const AuditLog = async (props: AuditLogProps) =>{
    try {
        const {orgId} = auth();
        const user = await currentUser();

        if(!orgId || !user){
            throw new Error("User not found !")
        } 

        const {entityId, entityTitle,entityType,action} = props;

        await db.audiLog.create({
            data: {
                orgId,
                entityId,
                entityType,
                entityTitle,
                action,
                userId: user?.id,
                userImage: user?.imageUrl,
                userName: user?.lastName + " "+ user?.firstName,
                
            }
        })
    } catch (error) {
       console.log("[AUDIT_LOG_ERROR]", error) 
    }

}