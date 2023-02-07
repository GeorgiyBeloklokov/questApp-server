import { Body, Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateQuestionDto } from './dto/create-question.dto';
import { Question } from './question.model';
import { QuestionService } from './question.service';

@ApiTags('Questions')
@Controller('questions')
export class QuestionController {
  constructor(private questionService: QuestionService) {}

  @ApiResponse({ status: 200, type: Question })
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  createQuestion(@Body() dto: CreateQuestionDto, @UploadedFile() image) {
    return this.questionService.create(dto, image);
  }

  @ApiOperation({ summary: 'Get questions' })
  @ApiResponse({ status: 200, type: Question })
  //@UseGuards(JwtAuthGuard)
  //@Roles('admin')
  //@UseGuards(RolesGuard)
  @Get('/questions')
  getAllQuestions() {
    return this.questionService.getQuestions();
  }
}
