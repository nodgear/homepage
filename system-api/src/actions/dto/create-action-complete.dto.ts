import { ApiProperty, PickType } from '@nestjs/swagger';
import { CreateActionDto } from './create-action.dto';

export class CreateActionCompleteDto extends PickType(CreateActionDto, ['title', 'description', 'amount'] as const) {
    @ApiProperty()
    documentPath: Array<string>

    @ApiProperty()
    fileName: string
}
