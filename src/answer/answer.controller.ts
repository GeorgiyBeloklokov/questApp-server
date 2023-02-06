import { Answer } from 'src/answer/answer.model';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AnswerService } from './answer.service';
import { CreateAnswerDto } from './dto/create-answer.dto';

@ApiTags('Answers')
@Controller('answers')
export class AnswerController {
  constructor(private answerService: AnswerService) {}
  @ApiResponse({ status: 200, type: Answer })
  @Post()
  create(@Body() dto: CreateAnswerDto) {
    return this.answerService.createAnswer(dto);
  }

  @ApiResponse({ status: 200, type: Answer })
  @Get('/:value')
  getByValue(@Param('value') value: string) {
    return this.answerService.getAnswerByValue(value);
  }
}
