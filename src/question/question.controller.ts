import { Body, Controller, Get, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Question } from './question.model';
import { QuestionService } from './question.service';

@ApiTags('Questions')
@Controller('questions')
export class QuestionController {
  constructor(private questionService: QuestionService) {}
  @ApiOperation({ summary: 'Create question whit image file' })
  @ApiResponse({ status: 200, type: Question })
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(@Body() dto: CreateQuestionDto, @UploadedFile() image) {
    return this.questionService.create(dto, image);
  }

  @ApiOperation({ summary: 'Create question whit image link' })
  @ApiResponse({ status: 200, type: Question })
  @Post('/create')
  createQuestion(@Body() dto: CreateQuestionDto[]) {
    return this.questionService.createQuestion(dto);
  }

  @ApiOperation({ summary: 'Get questions' })
  @ApiResponse({ status: 200, type: Question })
  //@UseGuards(JwtAuthGuard)
  //@Roles('admin')
  //@UseGuards(RolesGuard)
  @Get()
  getAllQuestions() {
    return this.questionService.getQuestions();
  }

  /* @ApiOperation({ summary: 'Update question' })
  @ApiResponse({ status: 200, type: Question })
  //@UseGuards(JwtAuthGuard)
  //@Roles('admin')
  //@UseGuards(RolesGuard)
  @Put('/user:email/:id')
  updateQuestion(@Param('email') email: string, @Param('id') id: string, @Body() dto: UpdateQuestionDto) {
    return this.questionService.updateQuestion(email, id, dto);
  } */
}
