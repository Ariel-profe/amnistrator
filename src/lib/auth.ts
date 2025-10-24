import { betterAuth } from 'better-auth';
import { createAuthMiddleware, APIError } from 'better-auth/api'
import { prismaAdapter } from 'better-auth/adapters/prisma';
import prisma from '@/lib/prisma';
import { sendEmail } from './email';
import { passwordSchema } from './validation';

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: 'postgresql',
    }),
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true,
        async sendResetPassword({ user, url }) {
            await sendEmail({
                to: user.email,
                subject: 'Restablece tu contraseña',
                text: `Restablece tu contraseña haciendo clic en el siguiente enlace: ${url}`
            })
        }
    },
    emailVerification: {
        sendOnSignUp: true,
        autoSignInAfterVerification: true,
        async sendVerificationEmail({ user, url }) {
            await sendEmail({
                to: user.email,
                subject: 'Verifica tu correo electrónico',
                text: `Verifica tu correo electrónico haciendo clic en el siguiente enlace: ${url}`
            })
        }
    },
    user: {
        changeEmail: {
            enabled: true,
            async sendChangeEmailVerification({ user, newEmail, url }) {
                await sendEmail({
                    to: user.email,
                    subject: 'Verifica tu nuevo correo electrónico',
                    text: `Verifica tu nuevo correo electrónico haciendo clic en el siguiente enlace: ${url}`
                })
            }
        },
        additionalFields: {
            role: {
                type: 'string',
                default: 'user',
                input: false
            },
            status: {
                type: 'boolean',
                default: true,
                input: false
            },
            loginCount: {
                type: 'number',
                default: 0,
                input: false
            }
        }
    },
    hooks: {
        before: createAuthMiddleware(async ctx => {
            if (
                ctx.path === "/sign-up/email" ||
                ctx.path === "/reset-password" ||
                ctx.path === "/change-password"
            ) {
                const password = ctx.body.password || ctx.body.newPassword;
                const { error } = passwordSchema.safeParse(password);
                if (error) {
                    throw new APIError("BAD_REQUEST", {
                        message: "La contraseña no cumple con los requisitos de seguridad.",
                    });
                }
            }
        })
    }
});

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;