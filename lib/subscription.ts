import {auth} from '@clerk/nextjs'

import { db } from './db'

const DAY_IN_MS = 86_400_000;

export const checkSubscription = async () =>{
    const {orgId} =auth();

    if(!orgId) {
        // dont have any subcription here
        return false
    }

    const orgSubscription = await db.orgSubcription.findUnique({
        where: {
            orgId
        },
        select: {
            stripeSubscriptionId: true,
            stripeCurrentPeriodEnd: true,
            stripeCustomerId: true,
            stripePriceId: true
        }
    })

    if(!orgSubscription) {
        return false
    }

    // check valid ( it's not expired)
    const isValid = 
        orgSubscription.stripePriceId &&
        orgSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now()

    // make sure boolean

    return !!isValid
}

//-->create API_KEY , modal to open , OUR WEB HOOK AND OUR ACTION to actully trigger to checkout