import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const GetPayLoad = createParamDecorator((
    data: string | undefined,
    context: ExecutionContext
) => {
    const req = context.switchToHttp().getRequest()

    const { user } = req


    if(!user) return null
    
    return data ? user?.[data] : user
})