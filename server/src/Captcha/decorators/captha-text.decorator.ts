import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CaptchaText = createParamDecorator(
    (_data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        return request.captchaText;
    },
);
