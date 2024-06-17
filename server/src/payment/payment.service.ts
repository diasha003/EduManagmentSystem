import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class PaymentService {
    constructor(
        private readonly prisma: DatabaseService,
        private readonly jwtService: JwtService
    ) {}

    async getEventsPayment(headers: any) {
        const decoded: { id: number; roles: string[]; centerName: string } = this.jwtService.decode(headers.authorization.split(' ')[1]);

        const data = await this.prisma.transaction.findMany({
            where: {
                student: {
                    centerName: {
                        equals: decoded.centerName
                    }
                }
            }
        });
    }
}
