import { PrismaClient, UserModel } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { LoggerService } from '../logger/logger.service';

@injectable()
export class PrismaService {
	client: PrismaClient;
	constructor(@inject(TYPES.ILogger) private logger: LoggerService) {
		this.client = new PrismaClient();
	}

	async connect(): Promise<void> {
		try {
			await this.client.$connect();
			this.logger.info(`[PrismaServer] Подтянулся`);
		} catch (err) {
			if (err instanceof Error) {
				this.logger.info(
					`[PrismaServer] Ошибка подключения к БД ${err.message}`,
				);
			}
		}
	}
	async disconnect(): Promise<void> {
		await this.client.$disconnect();
	}
}
