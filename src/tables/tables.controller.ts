import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Param,
    Body,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import { TablesService } from './tables.service';
import { CreateTableDto } from './dtos/create-table.dto';
import { UpdateTableDto } from './dtos/update-table.dto';

@Controller('tables')
export class TablesController {
    constructor(private readonly tablesService: TablesService) {}

    /**
     * Create a new table
     * POST /tables
     */
    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() dto: CreateTableDto) {
        return this.tablesService.create(dto);
    }

    /**
     * Get a list of all tables
     * GET /tables
     */
    @Get()
    findAll() {
        return this.tablesService.findAll();
    }

    /**
     * Get a specific table by ID
     * GET /tables/:id
     */
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.tablesService.findOne(id);
    }

    /**
     * Update table data
     * PATCH /tables/:id
     */
    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdateTableDto) {
        return this.tablesService.update(id, dto);
    }

    /**
     * Delete a table
     * DELETE /tables/:id
     */
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id') id: string) {
        return this.tablesService.remove(id);
    }

    /**
     * Get all players assigned to a specific table
     * GET /tables/:id/players
     */
    @Get(':id/players')
    findPlayers(@Param('id') id: string) {
        return this.tablesService.getPlayers(id);
    }
}
