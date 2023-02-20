import { Answer } from 'src/answer/answer.model';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AnswerService } from './answer.service';
import { CreateAnswerDto } from './dto/create-answer.dto';

@ApiTags('Answers')
@Controller('answers')
export class AnswerController {
  constructor(private answerService: AnswerService) {}

  @ApiOperation({ summary: 'Get answers' })
  @ApiResponse({ status: 200, type: Answer })
  //@UseGuards(JwtAuthGuard)
  //@Roles('admin')
  //@UseGuards(RolesGuard)
  @Get()
  getAllQuestions() {
    return this.answerService.getAnswers();
  }

  /* @ApiOperation({ summary: 'Create array of answers' })
  @ApiResponse({ status: 200, type: Answer })
  @Post('/create')
  create(@Body() dto: CreateAnswerDto[]) {
    return this.answerService.createAnswer(dto);
  } */

  @ApiOperation({ summary: 'Create answer' })
  @ApiResponse({ status: 200, type: Answer })
  @Post('/create/one')
  createOneAnswer(@Body() dto: CreateAnswerDto) {
    return this.answerService.createOneAnswer(dto);
  }

  @ApiOperation({ summary: 'Delete answers' })
  @ApiResponse({ status: 200, type: Answer })
  @Delete('/delete')
  delete(@Body() dto: CreateAnswerDto) {
    return this.answerService.deleteAnswer(dto);
  }

  @ApiOperation({ summary: 'Get answer by title' })
  @ApiResponse({ status: 200, type: Answer })
  @Get('/:value')
  getByValue(@Param('value') value: string) {
    return this.answerService.getAnswerByValue(value);
  }
  @ApiOperation({ summary: 'Delete answer by id' })
  @ApiResponse({ status: 200, type: Answer })
  @Delete('/delete/:id')
  deleteById(@Param('id') id: number) {
    return this.answerService.deleteAnswerById(id);
  }
}
