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
import { PlayersService } from './players.service';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { UpdatePlayerDto } from './dtos/update-player.dto';

@Controller('players')
export class PlayersController {
    constructor(private readonly playersService: PlayersService) {}

    /**
     * Create a new player
     * POST /players
     */
    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() dto: CreatePlayerDto) {
        return this.playersService.create(dto);
    }

    /**
     * Get all players
     * GET /players
     */
    @Get()
    findAll() {
        return this.playersService.findAll();
    }

    /**
     * Get all players by table ID
     * GET /players/table/:tableId
     */
    @Get('table/:tableId')
    findByTable(@Param('tableId') tableId: string) {
        return this.playersService.findByTable(tableId);
    }

    /**
     * Get a single player by ID
     * GET /players/:id
     */
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.playersService.findOne(id);
    }

    /**
     * Update player info
     * PATCH /players/:id
     */
    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdatePlayerDto) {
        return this.playersService.update(id, dto);
    }

    /**
     * Delete player
     * DELETE /players/:id
     */
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id') id: string) {
        return this.playersService.remove(id);
    }
}
