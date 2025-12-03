import { Body, Controller, Post } from '@nestjs/common';
import { ColumnService } from './column.service';
import { Authorization } from 'src/shared/decorators/authorization.decorator';
import { SessionUser } from 'src/shared/decorators/session-user.decorator';
import { CreateColumnInput } from './inputs/create-column.input';

@Controller('columns')
export class ColumnController {
    constructor(private readonly columnService: ColumnService) {}

    @Authorization()
    @Post('create')
    async create(
        @SessionUser('id') userId: string,
        @Body() input: CreateColumnInput,
    ) {
        return this.columnService.create(userId, input);
    }
}
