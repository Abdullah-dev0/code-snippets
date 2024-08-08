import { isWithinExpirationDate } from "oslo";
import type { User } from "lucia";
import { prisma } from "../config/prismaClient.js";

export async function verifyVerificationCode(user: User, code: string): Promise<boolean> {
	const databaseCode = await prisma.emailVerificationCode.findFirst({
		where: {
			user_id: user.id,
		},
	});

	if (!databaseCode || databaseCode.code !== code) {
		return false;
	}

	if (!isWithinExpirationDate(databaseCode.expires_at)) {
		return false;
	}

	if (databaseCode.email !== user.email) {
		return false;
	}

	await prisma.emailVerificationCode.delete({
		where: {
			id: databaseCode.id,
		},
	});

	return true;
}
